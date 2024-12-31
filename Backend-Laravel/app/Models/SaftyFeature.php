<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SaftyFeature extends Model
{
    /** @use HasFactory<\Database\Factories\SaftyFeatureFactory> */
    use HasFactory;
    public function carDetails()
    {
        return $this->belongsToMany(CarDetail::class, 'car_detail_safty_features', 'safty_feature_id', 'car_detail_id');
    }
}
