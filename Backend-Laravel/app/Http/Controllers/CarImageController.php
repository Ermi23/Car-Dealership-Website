<?php

namespace App\Http\Controllers;

use App\Models\CarImage;
use App\Http\Requests\StoreCarImageRequest;
use App\Http\Requests\UpdateCarImageRequest;

class CarImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCarImageRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(CarImage $carImage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCarImageRequest $request, CarImage $carImage)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CarImage $carImage)
    {
        //
    }
}
