<?php

namespace Database\Factories;

use App\Models\Feature;
use App\Models\CarDetail;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CarDetailFeatures>
 */
class CarDetailFeatureFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'car_detail_id' => CarDetail::factory(),
            'feature_id' => Feature::factory(),
        ];
    }
}
