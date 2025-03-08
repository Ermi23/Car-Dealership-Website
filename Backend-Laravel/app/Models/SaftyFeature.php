<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SaftyFeature extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'description'];
    /** @use HasFactory<\Database\Factories\SaftyFeatureFactory> */
    public function carDetails()
    {
        return $this->belongsToMany(CarDetail::class, 'car_detail_safty_features', 'safty_feature_id', 'car_detail_id');
    }
}
