<?php

namespace App\Http\Controllers;

use App\Models\VehicleModel;
use Illuminate\Http\Request;
use App\Http\Resources\VehicleModelResource;
use App\Http\Requests\StoreVehicleModelRequest;
use App\Http\Requests\UpdateVehicleModelRequest;

class VehicleModelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $brandName = VehicleModel::paginate($perPage);
        return VehicleModelResource::collection($brandName);
    }

    public function dropdown(Request $request)
    {
        $brandName = VehicleModel::all();
        return VehicleModelResource::collection($brandName);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVehicleModelRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(VehicleModel $vehicleModel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVehicleModelRequest $request, VehicleModel $vehicleModel)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(VehicleModel $vehicleModel)
    {
        //
    }
}
