<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAssessmentTestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('assessment_tests', function (Blueprint $table) {
            $table->increments('id');
            $table->string('token')->unique();
            $table->string('email');
            $table->string('name');
            $table->string('level');
            $table->text('intelligence_profile');
            $table->text('top_five');
            $table->integer('final_score');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('assessment_tests');
    }
}
