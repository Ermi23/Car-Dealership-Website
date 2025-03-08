<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cylinder extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'description'];
    /** @use HasFactory<\Database\Factories\CylinderFactory> */
    public function carDetails()
    {
        return $this->hasMany(CarDetail::class, 'cylinder_id');
    }
}
