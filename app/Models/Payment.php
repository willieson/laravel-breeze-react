<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Payment extends Model
{
    use HasFactory;

    protected $table = 'payments';

    public static function generatePaymentId(): string
    {
        $prefix = 'INV-';
        $currentYearMonth = now()->format('Ym');

        $lastPayment = self::where('payment_id', 'LIKE', "{$prefix}{$currentYearMonth}%")
            ->orderBy('payment_id', 'desc')
            ->first();

        if ($lastPayment) {
            $lastId = (int) Str::substr($lastPayment->payment_id, -4);
            $newId = $lastId + 1;
        } else {
            $newId = 1;
        }

        return "{$prefix}{$currentYearMonth}" . Str::padLeft($newId, 4, '0');
    }
}
