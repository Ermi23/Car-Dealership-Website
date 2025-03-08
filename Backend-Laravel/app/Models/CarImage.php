<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarImage extends Model
{
    use HasFactory;
    protected $fillable = ['image', 'car_detail_id'];
    /** @use HasFactory<\Database\Factories\CarImageFactory> */
    public function carDetail()
    {
        return $this->belongsTo(CarDetail::class, 'car_detail_id');
    }
}
