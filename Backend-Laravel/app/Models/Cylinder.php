<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cylinder extends Model
{
    /** @use HasFactory<\Database\Factories\CylinderFactory> */
    use HasFactory;
    public function carDetails()
    {
        return $this->hasMany(CarDetail::class, 'cylinder_id');
    }
}
