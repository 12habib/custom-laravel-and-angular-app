<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCourseModulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('course_modules', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('course_id');
            $table->string('title');
            $table->float('price')->nullable();
            $table->boolean('free')->default(0); // if this is set to true, the price is ignored
            $table->boolean('active')->default(1);
            $table->integer('added_by');
            $table->integer('order')->default(0);
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
        Schema::dropIfExists('course_modules');
    }
}
