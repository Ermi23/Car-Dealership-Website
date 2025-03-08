<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarStatus extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'description'];
    /** @use HasFactory<\Database\Factories\CarStatusFactory> */
    public function carDetails()
    {
        return $this->hasMany(CarDetail::class, 'car_status_id');
    }
}
