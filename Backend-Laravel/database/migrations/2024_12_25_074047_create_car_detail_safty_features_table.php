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
        Schema::create('car_detail_safty_features', function (Blueprint $table) {
            $table->id();
            $table->foreignId('car_detail_id')->constrained('car_details')->onDelete('restrict')->onUpdate('cascade');
            $table->foreignId('safty_feature_id')->constrained('safty_features')->onDelete('restrict')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('car_detail_safty_features');
    }
};
