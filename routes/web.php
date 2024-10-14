<?php

use App\Http\Controllers\MovieController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ScheduleController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });


Route::get('/', [MovieController::class, 'index']);
Route::post('/movies', [MovieController::class, 'store']);
Route::get('/movies/{movie}', [MovieController::class, 'show'])->name('movies.show');

// Rute untuk menampilkan daftar movie
Route::get('/admin/movies', [MovieController::class, 'admin'])->name('admin.movies.index');
// Rute untuk mengedit movie
Route::get('/admin/movies/edit/{movie}', [MovieController::class, 'edit'])->name('admin.movies.edit');
Route::post('/movies/{movie}', [MovieController::class, 'update'])->name('movies.update');

// Rute untuk menghapus movie
Route::delete('/movies/{movie}', [MovieController::class, 'destroy'])->name('movies.destroy');
Route::put('/movies/{movie}', [MovieController::class, 'update'])->name('movies.update');


// Rute untuk mendapatkan jadwal berdasarkan movie_id
Route::get('/schedules', [ScheduleController::class, 'index']);



Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
