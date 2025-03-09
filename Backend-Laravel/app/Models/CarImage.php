<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarImage extends Model
{
    use HasFactory;
    // protected $fillable = ['image', 'car_detail_id'];

    protected $fillable = [
        'car_detail_id',
        'image_url', // Ensure this is included
        'is_primary',
        'created_at',
        'updated_at',
    ];

    /** @use HasFactory<\Database\Factories\CarImageFactory> */
    public function carDetail()
    {
        return $this->belongsTo(CarDetail::class, 'car_detail_id');
    }
}
