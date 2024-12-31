<?php

namespace App\Http\Controllers;

use App\Models\Cylinder;
use Illuminate\Http\Request;
use App\Http\Resources\CylinderResource;
use App\Http\Requests\StoreCylinderRequest;
use App\Http\Requests\UpdateCylinderRequest;

class CylinderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function dropdown(Request $request)
    {
        $brandName = Cylinder::all();
        return CylinderResource::collection($brandName);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCylinderRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Cylinder $cylinder)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCylinderRequest $request, Cylinder $cylinder)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cylinder $cylinder)
    {
        //
    }
}
