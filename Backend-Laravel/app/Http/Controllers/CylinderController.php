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
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $cylinder = Cylinder::paginate($perPage);
        return CylinderResource::collection($cylinder);
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
        $cylinder = Cylinder::create($request->validated());
        return new CylinderResource($cylinder);
    }

    /**
     * Display the specified resource.
     */
    public function show(Cylinder $cylinder)
    {
        return new CylinderResource($cylinder);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCylinderRequest $request, Cylinder $cylinder)
    {
        $cylinder->update($request->validated());
        return new CylinderResource($cylinder);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cylinder $cylinder)
    {
        $cylinder->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Cylinder deleted successfully',
        ]);
    }
}
