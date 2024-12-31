<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('car_details', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('vehicle_model_id')->constrained('vehicle_models')->onDelete('restrict')->onUpdate('cascade');
            $table->foreignId('type_id')->constrained('types')->onDelete('restrict')->onUpdate('cascade');
            $table->foreignId('drive_type_id')->constrained('drive_types')->onDelete('restrict')->onUpdate('cascade');
            $table->foreignId('fuel_type_id')->constrained('fuel_types')->onDelete('restrict')->onUpdate('cascade');
            $table->foreignId('transmission_id')->constrained('transmissions')->onDelete('restrict')->onUpdate('cascade');
            $table->foreignId('cylinder_id')->constrained('cylinders')->onDelete('restrict')->onUpdate('cascade');
            $table->foreignId('car_status_id')->constrained('car_statuses')->onDelete('restrict')->onUpdate('cascade');
            $table->tinyInteger('door')->unsigned(); // Changed to tinyInteger for numerical value
            $table->integer('mileage')->unsigned(); // Changed to integer for mileage value
            $table->decimal('price', 10, 2); // Changed to decimal for price with precision
            $table->string('color');
            $table->year('year'); // Changed to year type for the year
            $table->boolean('sold')->default(false); // Default to false
            $table->boolean('feature_ad')->default(false); // Default to false
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('car_details');
    }
};
