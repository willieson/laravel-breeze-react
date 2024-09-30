<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class FilmController extends Controller
{
    public function index()
    {
        return Inertia::render('FilmHome', [
            'title' => 'Laravel With React'
        ]);
    }
}
