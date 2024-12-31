<?php

namespace App\Http\Controllers;

use App\Models\Transmission;
use Illuminate\Http\Request;
use App\Http\Resources\TransmissionResource;
use App\Http\Requests\StoreTransmissionRequest;
use App\Http\Requests\UpdateTransmissionRequest;

class TransmissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
    }

    public function dropdown(Request $request)
    {
        $brandName = Transmission::all();
        return TransmissionResource::collection($brandName);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTransmissionRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Transmission $transmission)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTransmissionRequest $request, Transmission $transmission)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transmission $transmission)
    {
        //
    }
}
