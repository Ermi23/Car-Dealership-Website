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
        Schema::create('car_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('car_detail_id')
                ->constrained('car_details')
                ->onDelete('restrict')
                ->onUpdate('cascade');
            $table->string('image_url'); // URL as string is appropriate
            $table->boolean('is_primary')->default(false); // Changed to boolean for true/false values
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('car_images');
    }
};
