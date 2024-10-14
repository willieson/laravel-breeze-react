<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{
    public function index(Request $request)
    {
        // Validasi bahwa movie_id ada di query string
        $request->validate([
            'movie_id' => 'required|integer|exists:movies,movie_id',
        ]);

        // Ambil jadwal berdasarkan movie_id
        $schedules = Schedule::where('movie_id', $request->movie_id)->get();

        // Kembalikan data dalam format JSON
        return response()->json($schedules);
    }
}
