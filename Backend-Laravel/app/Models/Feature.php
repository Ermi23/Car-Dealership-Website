<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feature extends Model
{
    /** @use HasFactory<\Database\Factories\FeaturesFactory> */
    use HasFactory;
    public function carDetails()
    {
        return $this->belongsToMany(CarDetail::class, 'car_detail_features', 'feature_id', 'car_detail_id');
    }
}
