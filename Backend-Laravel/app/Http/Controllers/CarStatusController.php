<?php

namespace App\Http\Controllers;

use App\Models\CarStatus;
use App\Http\Requests\StoreCarStatusRequest;
use App\Http\Requests\UpdateCarStatusRequest;

class CarStatusController extends Controller
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
    public function store(StoreCarStatusRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(CarStatus $carStatus)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCarStatusRequest $request, CarStatus $carStatus)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CarStatus $carStatus)
    {
        //
    }
}
