<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CarDetailSaftyFeaturesResource extends JsonResource
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
            'car_detail_id' => $this->car_detail_id,
            'safety_feature_id' => $this->safety_feature_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'car_detail' => new CarDetailResource($this->whenLoaded('carDetail')),
            'safety_feature' => new SaftyFeatureResource($this->whenLoaded('safetyFeature')),
        ];
    }
}
