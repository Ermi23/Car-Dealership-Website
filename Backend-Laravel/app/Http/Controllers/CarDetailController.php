<?php

namespace App\Http\Controllers;

use App\Models\CarImage;
use App\Models\CarDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\CarDetailResource;
use App\Http\Requests\StoreCarDetailRequest;
use App\Http\Requests\UpdateCarDetailRequest;

class CarDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $brandName = CarDetail::with(
            [
                'type',
                'driveType',
                'fuelType',
                'transmission',
                'cylinder',
                'carStatus',
                'features',
                'saftyFeatures',
                'images',
                'vehicleModel'
            ]
        )->paginate($perPage);

        return CarDetailResource::collection($brandName);
    }

    public function featuredcars(Request $request)
    {
        $perPage = $request->input('per_page', 8);
        $brandName = CarDetail::with(
            [
                'type',
                'transmission',
                'images',
                'vehicleModel'
            ]
        )
            ->where('feature_ad', 1)
            ->paginate($perPage);

        return CarDetailResource::collection($brandName);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCarDetailRequest $request)
    {
        DB::beginTransaction();

        try {
            // Create the car detail
            $carDetail = CarDetail::create([
                'name' => $request->name,
                'vehicle_model_id' => $request->vehicle_model_id,
                'type_id' => $request->type_id,
                'drive_type_id' => $request->drive_type_id,
                'fuel_type_id' => $request->fuel_type_id,
                'transmission_id' => $request->transmission_id,
                'cylinder_id' => $request->cylinder_id,
                'car_status_id' => $request->car_status_id,
                'door' => $request->door,
                'mileage' => $request->mileage,
                'price' => $request->price,
                'color' => $request->color,
                'year' => $request->year,
                'sold' => $request->sold,
                'feature_ad' => $request->feature_ad,
            ]);

            // Handle images
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $index => $image) {
                    // Store the image in the 'public' disk under the 'car_images' directory
                    $imagePath = Storage::disk('public')->put('car_images', $image);

                    // Generate the full URL for the stored image
                    $imageUrl = asset('storage/' . $imagePath);

                    // Create the car image record with the image URL
                    CarImage::create([
                        'car_detail_id' => $carDetail->id,
                        'image_url' => $imageUrl, // Save the full URL
                        'primary' => $index === 0, // Set primary to true for the first image
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }

            // Handle features
            if ($request->has('features')) {
                $carDetail->features()->attach($request->features);
            }

            // Handle safety features
            if ($request->has('safety_features')) {
                $carDetail->safetyFeatures()->attach($request->safety_features);
            }

            DB::commit();

            return response()->json(['message' => 'Car detail stored successfully'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Failed to store car detail', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(CarDetail $carDetail)
    {
        $carDetail->load([
            'type',
            'driveType',
            'fuelType',
            'transmission',
            'cylinder',
            'carStatus',
            'vehicleModel.brandName',
            'images',
            'saftyFeatures',
            'features',
        ]);

        return new CarDetailResource($carDetail);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCarDetailRequest $request, CarDetail $carDetail)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CarDetail $carDetail)
    {
        //
    }

    public function inventory(Request $request)
    {
        $perPage = $request->input('per_page', 12);

        // Start the query builder with the CarDetail model
        $query = CarDetail::with([
            'type',
            'transmission',
            'images',
            // 'vehicleModel',
            // 'driveType',
            'fuelType',
            'cylinder',
            // 'features',
            // 'saftyFeatures'
        ]);

        // Apply filters dynamically based on the request input

        if ($model = $request->input('model')) {
            $query->whereHas('vehicleModel', function ($q) use ($model) {
                $q->where('vehicle_model_id', $model);
            });
        }

        if ($make = $request->input('make')) {
            $query->whereHas('vehicleModel.brandName', function ($q) use ($make) {
                $q->where('brand_name_id', $make);
            });
        }

        if ($type = $request->input('type')) {
            $query->whereHas('type', function ($q) use ($type) {
                $q->where('type_id', $type);
            });
        }

        if ($driveType = $request->input('driveType')) {
            $query->whereHas('driveType', function ($q) use ($driveType) {
                $q->where('drive_type_id', $driveType);
            });
        }

        if ($fuelType = $request->input('fuelType')) {
            $query->whereHas('fuelType', function ($q) use ($fuelType) {
                $q->where('feul_type_id', $fuelType);
            });
        }

        if ($transmission = $request->input('transmission')) {
            $query->whereHas('transmission', function ($q) use ($transmission) {
                $q->where('id', $transmission);
            });
        }

        if ($minPrice = $request->input('minPrice')) {
            $query->where('price', '>=', $minPrice);
        }

        if ($maxPrice = $request->input('maxPrice')) {
            $query->where('price', '<=', $maxPrice);
        }

        if ($mileage = $request->input('mileage')) {
            $query->where('mileage', '<=', $mileage);
        }

        if ($color = $request->input('color')) {
            $query->where('color', 'like', '%' . $color . '%');
        }

        if ($door = $request->input('door')) {
            $query->where('door', '=', $door);
        }

        if ($cylinders = $request->input('cylinder')) {
            $query->whereHas('cylinder', function ($q) use ($cylinders) {
                $q->where('id', 'like', '%' . $cylinders . '%');
            });
        }

        if ($minYear = $request->input('minYear')) {
            $query->where('year', '>=', $minYear);
        }

        if ($maxYear = $request->input('maxYear')) {
            $query->where('year', '<=', $maxYear);
        }

        // Paginate the results
        $cars = $query->paginate($perPage);

        // Return the filtered results as a collection
        return CarDetailResource::collection($cars);
    }
}
