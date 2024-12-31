<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VehicleModelResource extends JsonResource
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
            'description' => $this->description,
            'brand_name_id' => $this->brand_name_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'brand_name' => new BrandNameResource($this->whenLoaded('brandName')),
            'car_details' => CarDetailResource::collection($this->whenLoaded('carDetails')),
        ];
    }
}
