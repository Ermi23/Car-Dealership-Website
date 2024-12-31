<?php

namespace Database\Seeders;

use App\Models\Type;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use App\Models\Feature;
use App\Models\CarImage;
use App\Models\Cylinder;
use App\Models\FuelType;
use App\Models\BrandName;
use App\Models\CarDetail;
use App\Models\CarStatus;
use App\Models\DriveType;
use App\Models\SaftyFeature;
use App\Models\Transmission;
use App\Models\VehicleModel;
use Illuminate\Database\Seeder;
use App\Models\CarDetailFeature;
use Illuminate\Support\Facades\Hash;
use App\Models\CarDetailSaftyFeature;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'id' => 1,
            'name' => 'Habteyes Asfaw',
            'email' => 'habteyes.asfaw@hst-et.com',
            'password' => Hash::make('Password.01'),
        ]);

        User::factory()->create([
            'id' => 2,
            'name' => 'Ermias Tadesser',
            'email' => 'ermias.tadesse@hst-et.com',
            'password' => Hash::make('Password.01'),
        ]);

        // Create 10 records for each table
        BrandName::factory(10)->create();
        VehicleModel::factory(10)->create();
        Type::factory(10)->create();
        DriveType::factory(10)->create();
        FuelType::factory(10)->create();
        Transmission::factory(10)->create();
        Cylinder::factory(10)->create();
        SaftyFeature::factory(10)->create();
        CarStatus::factory(10)->create();

        // Car details and relationships
        CarDetail::factory(10)
            ->has(CarImage::factory(3), 'images') // Each car has 3 images
            ->create();

        Feature::factory(10)->create();
        CarDetailFeature::factory(10)->create();
        CarDetailSaftyFeature::factory(10)->create();
    }
}
