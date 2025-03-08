<?php

namespace App\Http\Controllers;

use App\Models\Feature;
use Illuminate\Http\Request;
use App\Http\Resources\FeaturesResource;
use App\Http\Requests\StoreFeatureRequest;
use App\Http\Requests\UpdateFeatureRequest;

class FeatureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $feature = Feature::paginate($perPage);
        return FeaturesResource::collection($feature);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFeatureRequest $request)
    {
        $feature = Feature::create($request->validated());
        return new FeaturesResource($feature);
    }

    /**
     * Display the specified resource.
     */
    public function show(Feature $feature)
    {
        return new FeaturesResource($feature);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFeatureRequest $request, Feature $feature)
    {
        $feature->update($request->validated());
        return new FeaturesResource($feature);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Feature $feature)
    {
        $feature->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Feature deleted successfully',
        ]);
    }
}
