<?php

namespace App\Http\Controllers;

use App\Models\contactUs;
use Illuminate\Http\Request;
use App\Http\Resources\ContactUsResource;
use App\Http\Requests\StorecontactUsRequest;
use App\Http\Requests\UpdatecontactUsRequest;

class contactUsContriller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $contactUs = ContactUs::paginate($perPage);
        return ContactUsResource::collection($contactUs);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorecontactUsRequest $request)
    {
        // Store the message
        ContactUs::create($request->validated());

        return response()->json(['message' => 'Message stored successfully!'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(contactUs $contactUs)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatecontactUsRequest $request, contactUs $contactUs)
    {
        $contactUs->update($request->validated());

        return response()->json(['message' => 'Message updated successfully!']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(contactUs $contactUs)
    {
        $contactUs->delete();
        return response()->json(['message' => 'Message deleted successfully!']);
    }
}
