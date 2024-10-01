<?php

namespace Database\Seeders;

use App\Models\Movie;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class MoviesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        // Reset cache sebelum melakukan seeding
        \Illuminate\Support\Facades\Artisan::call('cache:clear');
        // Buat 10 movie dengan ID yang unik
        foreach (range(1, 10) as $i) {
            Movie::create([
                'movie_id' => Movie::generateMovieId(),
                'title' => fake()->sentence(3),
                'description' => fake()->paragraph(4),
                'genre' => fake()->randomElement(['Action', 'Drama', 'Science Fiction', 'Adventure', 'Comedy']),
                'duration' => fake()->numberBetween(90, 180),
                'poster' => 'https://placehold.co/600x400/png',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
