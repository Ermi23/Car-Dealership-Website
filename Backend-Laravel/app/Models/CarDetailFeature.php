<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarDetailFeature extends Model
{
    /** @use HasFactory<\Database\Factories\CarDetailFeaturesFactory> */
    use HasFactory;
    public function carDetail()
    {
        return $this->belongsTo(CarDetail::class, 'car_detail_id');
    }

    public function feature()
    {
        return $this->belongsTo(Feature::class, 'feature_id');
    }
}
