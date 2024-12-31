<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TypeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\CarImageController;
use App\Http\Controllers\CylinderController;
use App\Http\Controllers\FuelTypeController;
use App\Http\Controllers\BrandNameController;
use App\Http\Controllers\CarDetailController;
use App\Http\Controllers\CarStatusController;
use App\Http\Controllers\contactUsContriller;
use App\Http\Controllers\DriveTypeController;
use App\Http\Controllers\SaftyFeatureController;
use App\Http\Controllers\TransmissionController;
use App\Http\Controllers\VehicleModelController;
use App\Http\Controllers\CarDetailFeatureController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\CarDetailSaftyFeatureController;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

// Public Routes (No Authentication Required)

// Register a new user
Route::post('/register', [RegisteredUserController::class, 'store']);

// Log in and get an API token
Route::post('/login', [AuthenticatedSessionController::class, 'store']);

Route::get('featured-cars', [CarDetailController::class, 'featuredcars']);
Route::get('car-inventory', [CarDetailController::class, 'inventory']);
Route::get('car-detail/{carDetail}', [CarDetailController::class, 'show']);
Route::get('transmissions', [TransmissionController::class, 'dropdown']);
Route::get('types', [TypeController::class, 'dropdown']);
Route::get('fuel-types', [FuelTypeController::class, 'dropdown']);
Route::get('brand-names', [BrandNameController::class, 'dropdown']);
Route::get('vehicle-models', [VehicleModelController::class, 'dropdown']);
Route::get('drive-types', [DriveTypeController::class, 'dropdown']);
Route::get('cylinders', [CylinderController::class, 'dropdown']);
Route::post('contact-us', [contactUsContriller::class, 'store']);

Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);



// API Routes
Route::middleware(['auth:sanctum'])->group(function () {
    // Fetch authenticated user details
    Route::apiResource('users', UserController::class);

    Route::apiResource('brand-names', BrandNameController::class);
    Route::apiResource('models', VehicleModelController::class);
    Route::apiResource('types', TypeController::class);
    Route::apiResource('drive-types', DriveTypeController::class);
    Route::apiResource('feul-types', FuelTypeController::class);
    Route::apiResource('features', FeatureController::class);
    Route::apiResource('transmissions', TransmissionController::class);
    Route::apiResource('cylinders', CylinderController::class);
    Route::apiResource('safty-features', SaftyFeatureController::class);
    Route::apiResource('car-statuses', CarStatusController::class);
    Route::apiResource('car-details', CarDetailController::class);
    Route::apiResource('car-images', CarImageController::class);
    Route::apiResource('car-detail-features', CarDetailFeatureController::class);
    Route::apiResource('car-detail-safty-features', CarDetailSaftyFeatureController::class);
});
