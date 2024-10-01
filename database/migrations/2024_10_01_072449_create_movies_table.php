<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Tabel movies (films)
        Schema::create('movies', function (Blueprint $table) {
            $table->string('movie_id')->primary(); // Menggunakan string sebagai primary key
            $table->string('title');
            $table->text('description');
            $table->string('genre');
            $table->integer('duration'); // Durasi dalam menit
            $table->string('poster'); // URL poster
            $table->timestamps();
        });

        // Tabel schedules (jadwal tayang)
        Schema::create('schedules', function (Blueprint $table) {
            $table->string('schedule_id')->primary(); // Menggunakan string sebagai primary key
            $table->string('movie_id'); // Tipe data string agar sesuai dengan tabel movies
            $table->foreign('movie_id')->references('movie_id')->on('movies')->onDelete('cascade');
            $table->date('date'); // Tanggal tayang
            $table->time('time'); // Jam tayang
            $table->integer('stock'); // Jumlah tiket yang tersedia
            $table->timestamps();
        });

        // Tabel tickets (tiket yang dibeli oleh pengguna)
        Schema::create('tickets', function (Blueprint $table) {
            $table->string('ticket_id')->primary(); // Ubah menjadi string
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('schedule_id'); // Definisikan kolom schedule_id sebagai string
            $table->foreign('schedule_id')->references('schedule_id')->on('schedules')->onDelete('cascade'); // Foreign key
            $table->decimal('price', 8, 2); // Harga tiket
            $table->integer('rating')->nullable(); // Rating film setelah pembelian
            $table->timestamps();
        });

        // Tabel payments (pembayaran untuk tiket)
        Schema::create('payments', function (Blueprint $table) {
            $table->string('payment_id')->primary(); // Ubah menjadi string
            $table->string('ticket_id'); // Definisikan kolom ticket_id
            $table->foreign('ticket_id')->references('ticket_id')->on('tickets')->onDelete('cascade');
            $table->string('method'); // Metode pembayaran
            $table->string('status'); // Status pembayaran (misalnya 'paid', 'pending')
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
        Schema::dropIfExists('tickets');
        Schema::dropIfExists('schedules');
        Schema::dropIfExists('movies');
    }
};
