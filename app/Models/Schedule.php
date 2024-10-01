<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Schedule extends Model
{
    use HasFactory;

    protected $table = 'schedules';

    public static function generateScheduleId(): string
    {
        $prefix = 'SCD-';
        $currentYearMonth = now()->format('Ym');

        $lastSchedule = self::where('schedule_id', 'LIKE', "{$prefix}{$currentYearMonth}%")
            ->orderBy('schedule_id', 'desc')
            ->first();

        if ($lastSchedule) {
            $lastId = (int) Str::substr($lastSchedule->schedule_id, -4);
            $newId = $lastId + 1;
        } else {
            $newId = 1;
        }

        return "{$prefix}{$currentYearMonth}" . Str::padLeft($newId, 4, '0');
    }
}
