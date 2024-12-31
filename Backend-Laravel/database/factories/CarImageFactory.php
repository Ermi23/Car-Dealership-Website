<?php

namespace Database\Factories;

use App\Models\CarDetail;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CarImage>
 */
class CarImageFactory extends Factory
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
            'image_url' => $this->faker->imageUrl(),
            'is_primary' => $this->faker->boolean,
        ];
    }
}
