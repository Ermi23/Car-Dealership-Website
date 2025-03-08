<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BrandName extends Model
{
    /** @use HasFactory<\Database\Factories\BrandNameFactory> */
    use HasFactory;

    protected $fillable = ['name', 'description'];

    public function vehicleModels()
    {
        return $this->hasMany(VehicleModel::class, 'brand_name_id');
    }
}
