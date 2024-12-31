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
        Schema::create('contact_us', function (Blueprint $table) {
            $table->id();
            $table->string('name');        // Suitable for names; varchar(255) is usually sufficient
            $table->string('email', 255);  // Email addresses; 255 is a common maximum length
            $table->string('subject', 255); // Subject line; 255 is often enough for most subjects
            $table->text('message');       // Use text for messages as they can be longer than 255 charac
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contact_us');
    }
};
