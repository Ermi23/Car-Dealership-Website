<?php

namespace Database\Factories;

use App\Models\Type;
use App\Models\Cylinder;
use App\Models\FuelType;
use App\Models\CarStatus;
use App\Models\DriveType;
use App\Models\Transmission;
use App\Models\VehicleModel;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CarDetail>
 */
class CarDetailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word,
            'vehicle_model_id' => VehicleModel::factory(),
            'type_id' => Type::factory(),
            'drive_type_id' => DriveType::factory(),
            'fuel_type_id' => FuelType::factory(),
            'transmission_id' => Transmission::factory(),
            'cylinder_id' => Cylinder::factory(),
            'car_status_id' => CarStatus::factory(),
            'door' => $this->faker->numberBetween(2, 5),
            'mileage' => $this->faker->numberBetween(1000, 200000),
            'price' => $this->faker->randomFloat(2, 5000, 50000),
            'color' => $this->faker->safeColorName,
            'year' => $this->faker->year,
            'sold' => $this->faker->boolean, // Add sold attribute
            'feature_ad' => $this->faker->boolean, // Add feature_ad attribute
        ];
    }
}
