<?php

namespace App\Http\Controllers;

use App\Models\DriveType;
use Illuminate\Http\Request;
use App\Http\Resources\DriveTypeResource;
use App\Http\Requests\StoreDriveTypeRequest;
use App\Http\Requests\UpdateDriveTypeRequest;

class DriveTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $brandName = DriveType::paginate($perPage);
        return DriveTypeResource::collection($brandName);
    }

    public function dropdown(Request $request)
    {
        $brandName = DriveType::all();
        return DriveTypeResource::collection($brandName);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDriveTypeRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(DriveType $driveType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDriveTypeRequest $request, DriveType $driveType)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DriveType $driveType)
    {
        //
    }
}
