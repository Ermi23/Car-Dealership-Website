<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarDetailSaftyFeature extends Model
{
    /** @use HasFactory<\Database\Factories\CarDetailSaftyFeaturesFactory> */
    use HasFactory;
    public function carDetail()
    {
        return $this->belongsTo(CarDetail::class, 'car_detail_id');
    }

    public function saftyFeature()
    {
        return $this->belongsTo(SaftyFeature::class, 'safty_feature_id');
    }
}
