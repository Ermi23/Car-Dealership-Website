<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CarDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'type' => new TypeResource($this->whenLoaded('type')),
            'drive_type' => new DriveTypeResource($this->whenLoaded('driveType')),
            'fuel_type' => new FeulTypeResource($this->whenLoaded('fuelType')),
            'transmission' => new TransmissionResource($this->whenLoaded('transmission')),
            'cylinder' => new CylinderResource($this->whenLoaded('cylinder')),
            'car_status' => new CarStatusResource($this->whenLoaded('carStatus')),
            'door' => $this->door,
            'mileage' => $this->mileage,
            'price' => $this->price,
            'color' => $this->color,
            'year' => $this->year,
            'sold' => $this->sold,
            'feature_ad' => $this->feature_ad,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'vehicle_model' => new VehicleModelResource($this->whenLoaded('vehicleModel')),
            'car_images' => CarImageResource::collection($this->whenLoaded('images')),
            'safety_features' => SaftyFeatureResource::collection($this->whenLoaded('saftyFeatures')),
            'features' => FeaturesResource::collection($this->whenLoaded('features')),
        ];
    }
}
