<?php

namespace App\Http\Controllers;

use App\Models\Type;
use Illuminate\Http\Request;
use App\Http\Resources\TypeResource;
use App\Http\Requests\StoreTypeRequest;
use App\Http\Requests\UpdateTypeRequest;

class TypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $brandName = Type::paginate($perPage);
        return TypeResource::collection($brandName);
    }

    public function dropdown(Request $request)
    {
        $brandName = Type::all();
        return TypeResource::collection($brandName);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTypeRequest $request)
    {
        $type = Type::create($request->validated());
        return new TypeResource($type);
    }

    /**
     * Display the specified resource.
     */
    public function show(Type $type)
    {
        return new TypeResource($type);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTypeRequest $request, Type $type)
    {
        $type->update($request->validated());
        return new TypeResource($type);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Type $type)
    {
        $type->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Type deleted successfully',
        ]);
    }
}
