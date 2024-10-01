<?php

namespace Database\Factories;

use App\Models\Movie;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Movie>
 */
class MovieFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'movie_id' => function () {
                return Movie::generateMovieId(); // Generate unique movie_id
            },
            'title' => fake()->sentence(3), // Judul film acak dengan 3 kata
            'description' => fake()->paragraph(4), // Deskripsi acak 4 kalimat
            'genre' => fake()->randomElement(['Action', 'Drama', 'Science Fiction', 'Adventure', 'Comedy']), // Genre acak
            'duration' => fake()->numberBetween(90, 180), // Durasi antara 90 sampai 180 menit
            'poster' => 'https://placehold.co/600x400/png', // Poster placeholder
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
