<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCarDetailRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'vehicle_model_id' => ['required', 'exists:vehicle_models,id'],
            'type_id' => ['required', 'exists:types,id'],
            'drive_type_id' => ['required', 'exists:drive_types,id'],
            'fuel_type_id' => ['required', 'exists:fuel_types,id'],
            'transmission_id' => ['required', 'exists:transmissions,id'],
            'cylinder_id' => ['required', 'exists:cylinders,id'],
            'car_status_id' => ['required', 'exists:car_statuses,id'],
            'door' => ['required', 'integer', 'min:1', 'max:5'],
            'mileage' => ['required', 'integer', 'min:0'],
            'price' => ['required', 'numeric', 'min:0'],
            'color' => ['required', 'string', 'max:255'],
            'year' => ['required', 'integer', 'digits:4', 'min:1900', 'max:' . date('Y')],
            'sold' => ['required', 'boolean'],
            'feature_ad' => ['required', 'boolean'],
            'images' => ['required', 'array'],
            'images.*' => ['image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
            'features' => ['sometimes', 'array'],
            'features.*' => ['exists:features,id'],
            'safety_features' => ['sometimes', 'array'],
            'safety_features.*' => ['exists:safty_features,id'],
        ];
    }
}
