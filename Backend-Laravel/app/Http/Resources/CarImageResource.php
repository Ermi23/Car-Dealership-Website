<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CarImageResource extends JsonResource
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
            'image_url' => $this->image_url,
            'is_primary' => $this->is_primary,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'car_detail' => new CarDetailResource($this->whenLoaded('carDetail')),
        ];
    }
}
