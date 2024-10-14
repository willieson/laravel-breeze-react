<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Movie extends Model
{
    use HasFactory;

    protected $fillable = [
        'movie_id',
        'title',
        'description',
        'genre',
        'duration',
        'poster',
    ];

    // Tentukan primary key yang digunakan
    protected $primaryKey = 'movie_id';

    // Jika kolom movie_id bukan incrementing (jika tipe bukan integer), set false
    public $incrementing = false;

    // Jika tipe primary key bukan integer, tambahkan ini
    protected $keyType = 'string'; // atau sesuai tipe data kolom movie_id


    public function schedules()
    {
        //Eloquent ORM
        return $this->hasMany(Schedule::class);
    }

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
