<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VehicleModel extends Model
{
    /** @use HasFactory<\Database\Factories\ModelFactory> */
    use HasFactory;
    public function brandName()
    {
        return $this->belongsTo(BrandName::class, 'brand_name_id');
    }

    public function carDetails()
    {
        return $this->hasMany(CarDetail::class, 'vehicle_model_id');
    }
}
