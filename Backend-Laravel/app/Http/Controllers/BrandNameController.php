<?php

namespace App\Http\Controllers;

use App\Models\BrandName;
use Illuminate\Http\Request;
use App\Http\Resources\BrandNameResource;
use App\Http\Requests\StoreBrandNameRequest;
use App\Http\Requests\UpdateBrandNameRequest;

class BrandNameController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $brandName = BrandName::paginate($perPage);
        return BrandNameResource::collection($brandName);
    }

    public function dropdown(Request $request)
    {
        $brandName = BrandName::all();
        return BrandNameResource::collection($brandName);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBrandNameRequest $request)
    {
        $brandName = BrandName::create($request->validated());
        return new BrandNameResource($brandName);
    }

    /**
     * Display the specified resource.
     */
    public function show(BrandName $brandName)
    {
        return new BrandNameResource($brandName);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBrandNameRequest $request, BrandName $brandName)
    {
        $brandName->update($request->validated());
        return new BrandNameResource($brandName);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BrandName $brandName)
    {
        $brandName->delete();
        return response()->json([
            'message' => 'Brand name deleted successfully.',
        ]);
    }
}
