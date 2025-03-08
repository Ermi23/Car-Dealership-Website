<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FuelType extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'description'];
    /** @use HasFactory<\Database\Factories\FeulTypeFactory> */
    public function carDetails()
    {
        return $this->hasMany(CarDetail::class, 'fuel_type_id');
    }
}
