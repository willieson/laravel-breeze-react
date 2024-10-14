<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Ticket extends Model
{
    use HasFactory;

    public function user()
    {
        //Eloquent ORM
        return $this->belongsTo(User::class);
    }

    public function schedule()
    {
        //Eloquent ORM
        return $this->belongsTo(Schedule::class);
    }

    public function payment()
    {
        //Eloquent ORM
        return $this->hasOne(Payment::class);
    }

    protected $table = 'tickets';

    public static function generateTicketId(): string
    {
        $prefix = 'TIX-';
        $currentYearMonth = now()->format('Ym');

        $lastTicket = self::where('ticket_id', 'LIKE', "{$prefix}{$currentYearMonth}%")
            ->orderBy('ticket_id', 'desc')
            ->first();

        if ($lastTicket) {
            $lastId = (int) Str::substr($lastTicket->ticket_id, -4);
            $newId = $lastId + 1;
        } else {
            $newId = 1;
        }

        return "{$prefix}{$currentYearMonth}" . Str::padLeft($newId, 4, '0');
    }
}
