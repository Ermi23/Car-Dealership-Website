<?php

namespace Database\Factories;

use App\Models\CarDetail;
use App\Models\SaftyFeature;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CarDetailSaftyFeatures>
 */
class CarDetailSaftyFeatureFactory extends Factory
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
            'safty_feature_id' => SaftyFeature::factory(),
        ];
    }
}
