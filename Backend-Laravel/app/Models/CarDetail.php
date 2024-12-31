<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarDetail extends Model
{
    /** @use HasFactory<\Database\Factories\CarDetailFactory> */
    use HasFactory;
    public function vehicleModel()
    {
        return $this->belongsTo(VehicleModel::class, 'vehicle_model_id');
    }

    public function type()
    {
        return $this->belongsTo(Type::class, 'type_id');
    }

    public function driveType()
    {
        return $this->belongsTo(DriveType::class, 'drive_type_id');
    }

    public function fuelType()
    {
        return $this->belongsTo(FuelType::class, 'fuel_type_id');
    }

    public function transmission()
    {
        return $this->belongsTo(Transmission::class, 'transmission_id');
    }

    public function cylinder()
    {
        return $this->belongsTo(Cylinder::class, 'cylinder_id');
    }

    public function carStatus()
    {
        return $this->belongsTo(CarStatus::class, 'car_status_id');
    }

    public function images()
    {
        return $this->hasMany(CarImage::class, 'car_detail_id');
    }

    public function features()
    {
        return $this->belongsToMany(Feature::class, 'car_detail_features', 'car_detail_id', 'feature_id');
    }

    public function saftyFeatures()
    {
        return $this->belongsToMany(SaftyFeature::class, 'car_detail_safty_features', 'car_detail_id', 'safty_feature_id');
    }
}
