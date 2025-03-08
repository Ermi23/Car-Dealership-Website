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
    // Route::apiResource('users', UserController::class);
    // Route::apiResource('brand-names', BrandNameController::class);
    // Route::apiResource('models', VehicleModelController::class);
    // Route::apiResource('types', TypeController::class);
    // Route::apiResource('drive-types', DriveTypeController::class);
    // Route::apiResource('feul-types', FuelTypeController::class);
    // Route::apiResource('features', FeatureController::class);
    // Route::apiResource('transmissions', TransmissionController::class);
    // Route::apiResource('cylinders', CylinderController::class);
    // Route::apiResource('safty-features', SaftyFeatureController::class);
    // Route::apiResource('car-statuses', CarStatusController::class);
    // Route::apiResource('car-details', CarDetailController::class);
    // Route::apiResource('car-images', CarImageController::class);
    // Route::apiResource('car-detail-features', CarDetailFeatureController::class);
    // Route::apiResource('car-detail-safty-features', CarDetailSaftyFeatureController::class);

    Route::get('users', [UserController::class, 'index'])->name('users.index');
    Route::post('users', [UserController::class, 'store'])->name('users.store');
    Route::get('users/{user}', [UserController::class, 'show'])->name('users.show');
    Route::put('users/{user}', [UserController::class, 'update'])->name('users.update');
    Route::delete('users/{user}', [UserController::class, 'destroy'])->name('users.destroy');

    Route::get('brand-names', [BrandNameController::class, 'index'])->name('brand-names.index');
    Route::post('brand-names', [BrandNameController::class, 'store'])->name('brand-names.store');
    Route::get('brand-names/{brandName}', [BrandNameController::class, 'show'])->name('brand-names.show');
    Route::put('brand-names/{brandName}', [BrandNameController::class, 'update'])->name('brand-names.update');
    Route::delete('brand-names/{brandName}', [BrandNameController::class, 'destroy'])->name('brand-names.destroy');

    Route::get('models', [VehicleModelController::class, 'index'])->name('models.index');
    Route::post('models', [VehicleModelController::class, 'store'])->name('models.store');
    Route::get('models/{model}', [VehicleModelController::class, 'show'])->name('models.show');
    Route::put('models/{model}', [VehicleModelController::class, 'update'])->name('models.update');
    Route::delete('models/{model}', [VehicleModelController::class, 'destroy'])->name('models.destroy');

    Route::get('types', [TypeController::class, 'index'])->name('types.index');
    Route::post('types', [TypeController::class, 'store'])->name('types.store');
    Route::get('types/{type}', [TypeController::class, 'show'])->name('types.show');
    Route::put('types/{type}', [TypeController::class, 'update'])->name('types.update');
    Route::delete('types/{type}', [TypeController::class, 'destroy'])->name('types.destroy');

    Route::get('drive-types', [DriveTypeController::class, 'index'])->name('drive-types.index');
    Route::post('drive-types', [DriveTypeController::class, 'store'])->name('drive-types.store');
    Route::get('drive-types/{driveType}', [DriveTypeController::class, 'show'])->name('drive-types.show');
    Route::put('drive-types/{driveType}', [DriveTypeController::class, 'update'])->name('drive-types.update');
    Route::delete('drive-types/{driveType}', [DriveTypeController::class, 'destroy'])->name('drive-types.destroy');

    Route::get('feul-types', [FuelTypeController::class, 'index'])->name('feul-types.index');
    Route::post('feul-types', [FuelTypeController::class, 'store'])->name('feul-types.store');
    Route::get('feul-types/{fuelType}', [FuelTypeController::class, 'show'])->name('feul-types.show');
    Route::put('feul-types/{fuelType}', [FuelTypeController::class, 'update'])->name('feul-types.update');
    Route::delete('feul-types/{fuelType}', [FuelTypeController::class, 'destroy'])->name('feul-types.destroy');

    Route::get('features', [FeatureController::class, 'index'])->name('features.index');
    Route::post('features', [FeatureController::class, 'store'])->name('features.store');
    Route::get('features/{feature}', [FeatureController::class, 'show'])->name('features.show');
    Route::put('features/{feature}', [FeatureController::class, 'update'])->name('features.update');
    Route::delete('features/{feature}', [FeatureController::class, 'destroy'])->name('features.destroy');

    Route::get('transmissions', [TransmissionController::class, 'index'])->name('transmissions.index');
    Route::post('transmissions', [TransmissionController::class, 'store'])->name('transmissions.store');
    Route::get('transmissions/{transmission}', [TransmissionController::class, 'show'])->name('transmissions.show');
    Route::put('transmissions/{transmission}', [TransmissionController::class, 'update'])->name('transmissions.update');
    Route::delete('transmissions/{transmission}', [TransmissionController::class, 'destroy'])->name('transmissions.destroy');

    Route::get('cylinders', [CylinderController::class, 'index'])->name('cylinders.index');
    Route::post('cylinders', [CylinderController::class, 'store'])->name('cylinders.store');
    Route::get('cylinders/{cylinder}', [CylinderController::class, 'show'])->name('cylinders.show');
    Route::put('cylinders/{cylinder}', [CylinderController::class, 'update'])->name('cylinders.update');
    Route::delete('cylinders/{cylinder}', [CylinderController::class, 'destroy'])->name('cylinders.destroy');

    Route::get('safty-features', [SaftyFeatureController::class, 'index'])->name('safty-features.index');
    Route::post('safty-features', [SaftyFeatureController::class, 'store'])->name('safty-features.store');
    Route::get('safty-features/{saftyFeature}', [SaftyFeatureController::class, 'show'])->name('safty-features.show');
    Route::put('safty-features/{saftyFeature}', [SaftyFeatureController::class, 'update'])->name('safty-features.update');
    Route::delete('safty-features/{saftyFeature}', [SaftyFeatureController::class, 'destroy'])->name('safty-features.destroy');

    Route::get('car-statuses', [CarStatusController::class, 'index'])->name('car-statuses.index');
    Route::post('car-statuses', [CarStatusController::class, 'store'])->name('car-statuses.store');
    Route::get('car-statuses/{carStatus}', [CarStatusController::class, 'show'])->name('car-statuses.show');
    Route::put('car-statuses/{carStatus}', [CarStatusController::class, 'update'])->name('car-statuses.update');
    Route::delete('car-statuses/{carStatus}', [CarStatusController::class, 'destroy'])->name('car-statuses.destroy');

    Route::get('car-details', [CarDetailController::class, 'index'])->name('car-details.index');
    Route::post('car-details', [CarDetailController::class, 'store'])->name('car-details.store');
    Route::get('car-details/{carDetail}', [CarDetailController::class, 'show'])->name('car-details.show');
    Route::put('car-details/{carDetail}', [CarDetailController::class, 'update'])->name('car-details.update');
    Route::delete('car-details/{carDetail}', [CarDetailController::class, 'destroy'])->name('car-details.destroy');

    Route::get('car-images', [CarImageController::class, 'index'])->name('car-images.index');
    Route::post('car-images', [CarImageController::class, 'store'])->name('car-images.store');
    Route::get('car-images/{carImage}', [CarImageController::class, 'show'])->name('car-images.show');
    Route::put('car-images/{carImage}', [CarImageController::class, 'update'])->name('car-images.update');
    Route::delete('car-images/{carImage}', [CarImageController::class, 'destroy'])->name('car-images.destroy');

    Route::get('car-detail-features', [CarDetailFeatureController::class, 'index'])->name('car-detail-features.index');
    Route::post('car-detail-features', [CarDetailFeatureController::class, 'store'])->name('car-detail-features.store');
    Route::get('car-detail-features/{carDetailFeature}', [CarDetailFeatureController::class, 'show'])->name('car-detail-features.show');
    Route::put('car-detail-features/{carDetailFeature}', [CarDetailFeatureController::class, 'update'])->name('car-detail-features.update');
    Route::delete('car-detail-features/{carDetailFeature}', [CarDetailFeatureController::class, 'destroy'])->name('car-detail-features.destroy');

    Route::get('car-detail-safty-features', [CarDetailSaftyFeatureController::class, 'index'])->name('car-detail-safty-features.index');
    Route::post('car-detail-safty-features', [CarDetailSaftyFeatureController::class, 'store'])->name('car-detail-safty-features.store');
    Route::get('car-detail-safty-features/{carDetailSaftyFeature}', [CarDetailSaftyFeatureController::class, 'show'])->name('car-detail-safty-features.show');
    Route::put('car-detail-safty-features/{carDetailSaftyFeature}', [CarDetailSaftyFeatureController::class, 'update'])->name('car-detail-safty-features.update');
    Route::delete('car-detail-safty-features/{carDetailSaftyFeature}', [CarDetailSaftyFeatureController::class, 'destroy'])->name('car-detail-safty-features.destroy');

    Route::get('contact-us', [contactUsContriller::class, 'index'])->name('contact-us.index');
    Route::get('contact-us/{contactUs}', [contactUsContriller::class, 'show'])->name('contact-us.show');
    Route::put('contact-us/{contactUs}', [contactUsContriller::class, 'update'])->name('contact-us.update');
    Route::delete('contact-us/{contactUs}', [contactUsContriller::class, 'destroy'])->name('contact-us.destroy');
});
