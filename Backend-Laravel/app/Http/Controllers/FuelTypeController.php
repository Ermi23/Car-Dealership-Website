<?php

namespace App\Http\Controllers;

use App\Models\FuelType;
use Illuminate\Http\Request;
use App\Http\Resources\FeulTypeResource;
use App\Http\Requests\StoreFuelTypeRequest;
use App\Http\Requests\UpdateFuelTypeRequest;

class FuelTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $brandName = FuelType::paginate($perPage);
        return FeulTypeResource::collection($brandName);
    }

    public function dropdown(Request $request)
    {
        $brandName = FuelType::all();
        return FeulTypeResource::collection($brandName);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFuelTypeRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(FuelType $fuelType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFuelTypeRequest $request, FuelType $feulType)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FuelType $feulType)
    {
        //
    }
}
