<?php

namespace App\Http\Controllers;

use App\Models\SaftyFeature;
use Illuminate\Http\Request;
use App\Http\Resources\SaftyFeatureResource;
use App\Http\Requests\StoreSaftyFeatureRequest;
use App\Http\Requests\UpdateSaftyFeatureRequest;

class SaftyFeatureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $saftyFeature = SaftyFeature::paginate($perPage);
        return SaftyFeatureResource::collection($saftyFeature);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSaftyFeatureRequest $request)
    {
        $saftyFeature = SaftyFeature::create($request->validated());
        return new SaftyFeatureResource($saftyFeature);
    }

    /**
     * Display the specified resource.
     */
    public function show(SaftyFeature $saftyFeature)
    {
        return new SaftyFeatureResource($saftyFeature);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSaftyFeatureRequest $request, SaftyFeature $saftyFeature)
    {
        $saftyFeature->update($request->validated());
        return new SaftyFeatureResource($saftyFeature);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SaftyFeature $saftyFeature)
    {
        $saftyFeature->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Safty feature deleted successfully',
        ]);
    }
}
