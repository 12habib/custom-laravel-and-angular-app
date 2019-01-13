<?php

use Illuminate\Database\Seeder;
use App\CourseLevel;

class CourseLevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // delete everything first
        DB::statement("SET foreign_key_checks=0");
        CourseLevel::truncate();
        DB::statement("SET foreign_key_checks=1");

        for ($i = 0; $i < 4; $i++)
        {
            // fake entries
            $faker = Faker\Factory::create();
            CourseLevel::create([
                'title'  =>  $faker->words(2, true),
                'order'    =>  $i + 1,
                'added_by'  =>  1
            ]);
        }
    }
}
