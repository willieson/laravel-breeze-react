<?php

namespace App\Http\Controllers;

use App\Http\Resources\MovieCollection;
use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MovieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $movies = new MovieCollection(Movie::paginate(6));
        return Inertia::render('Homepage', [
            'title' => "Soul Cinema",
            'movies' => $movies
        ]);
    }

    public function admin()
    {
        $movies = Movie::all();
        // Kirim data film ke komponen Inertia
        return Inertia::render('AdminPage/ViewMovie', [
            'title' => "Soul Cinema",
            'movies' => $movies,
        ]);;
    }

    public function manage()
    {
        $movies = Movie::all();
        // Kirim data film ke komponen Inertia
        return Inertia::render('AdminPage/MovieManagement', [
            'title' => "Soul Cinema",
            'movies' => $movies,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Tampilkan halaman create
        return Inertia::render('AdminPage/CreateMovie');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'genre' => 'required|string|max:255',
            'duration' => 'required|integer',
            'poster' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Validasi untuk gambar
        ]);

        $movieID = Movie::generateMovieId();

        // Menyimpan gambar ke storage
        $posterPath = $request->file('poster')->store('posters', 'public'); // Simpan di folder public/posters

        $movie = new Movie();
        $movie->movie_id = $movieID;
        $movie->title = $request->title;
        $movie->description = $request->description;
        $movie->genre = $request->genre;
        $movie->duration = $request->duration;
        $movie->poster = $posterPath; // Simpan path gambar ke database
        $movie->save();
        return response()->json(['message' => 'Movie berhasil dibuat']);
    }


    /**
     * Display the specified resource.
     */
    public function show(Movie $movie)
    {
        // Mengembalikan tampilan dengan data film yang ditemukan
        return view('movies.show', compact('movie'));
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Movie $movie)
    {
        // Tampilkan halaman edit dengan data movie yang dipilih
        return Inertia::render('AdminPage/EditMovie', [
            'movie' => $movie,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Movie $movie)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'genre' => 'required|string|max:255',
            'duration' => 'required|integer',
            'poster' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Simpan data lainnya
        $movie->title = $request->title;
        $movie->description = $request->description;
        $movie->genre = $request->genre;
        $movie->duration = $request->duration;

        // Cek apakah poster baru diupload
        if ($request->hasFile('poster')) {
            // Ganti poster jika sebelumnya bukan default
            if ($movie->poster != 'posters/default.jpg') {
                // Hapus poster lama
                Storage::delete('public/' . $movie->poster);
            }
            // Simpan poster baru
            $movie->poster = $request->file('poster')->store('posters', 'public');
        }

        $movie->save();

        return response()->json(['message' => 'Movie berhasil diperbarui']);
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Movie $movie)
    {
        // Cek apakah poster yang ada adalah default
        if ($movie->poster !== 'posters/default.jpg') {
            // Hapus file poster dari storage
            Storage::delete($movie->poster);
        }

        // Hapus movie dari database
        $movie->delete();

        // Kembalikan respon JSON
        return response()->json(['message' => 'Movie berhasil dihapus.']);
    }
}
