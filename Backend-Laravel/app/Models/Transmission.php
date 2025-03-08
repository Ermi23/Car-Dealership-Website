<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transmission extends Model
{
    /** @use HasFactory<\Database\Factories\TransmissionFactory> */
    use HasFactory;

    protected $fillable = ['name', 'description'];

    public function carDetails()
    {
        return $this->hasMany(CarDetail::class, 'transmission_id');
    }
}
