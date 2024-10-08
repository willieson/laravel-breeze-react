<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Movie extends Model
{
    use HasFactory;

    protected $table = 'movies';

    public static function generateMovieId(): string
    {
        $prefix = 'MV-';
        $currentYearMonth = now()->format('Ym');

        $lastMovie = self::where('movie_id', 'LIKE', "{$prefix}{$currentYearMonth}%")
            ->orderBy('movie_id', 'desc')
            ->first();

        if ($lastMovie) {
            $lastId = (int) Str::substr($lastMovie->movie_id, -4);
            $newId = $lastId + 1;
        } else {
            $newId = 1;
        }

        return "{$prefix}{$currentYearMonth}" . Str::padLeft($newId, 4, '0');
    }
}
