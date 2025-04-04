<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DriveType extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'description'];
    /** @use HasFactory<\Database\Factories\DriveTypeFactory> */
    public function carDetails()
    {
        return $this->hasMany(CarDetail::class, 'drive_type_id');
    }
}
