<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePartDataTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('part_data', function (Blueprint $table) {
            $table->increments('id');
            $table->string('part_title')->nullable();
            $table->integer('intelligence_id');
            $table->integer('exercise_id');
            $table->integer('added_by')->nullable();
            $table->longText('screens')->default('');
            $table->boolean('published')->default(false);
            $table->longText('screens');

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
        Schema::dropIfExists('part_datas');
    }
}
