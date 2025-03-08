<?php

namespace App\Http\Controllers;

use App\Models\CarStatus;
use Illuminate\Http\Request;
use App\Http\Resources\CarStatusResource;
use App\Http\Requests\StoreCarStatusRequest;
use App\Http\Requests\UpdateCarStatusRequest;

class CarStatusController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $carStatus = CarStatus::paginate($perPage);
        return CarStatusResource::collection($carStatus);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCarStatusRequest $request)
    {
        $carStatus = CarStatus::create($request->validated());
        return new CarStatusResource($carStatus);
    }

    /**
     * Display the specified resource.
     */
    public function show(CarStatus $carStatus)
    {
        return new CarStatusResource($carStatus);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCarStatusRequest $request, CarStatus $carStatus)
    {
        $carStatus->update($request->validated());
        return new CarStatusResource($carStatus);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CarStatus $carStatus)
    {
        $carStatus->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Car status deleted successfully',
        ]);
    }
}
