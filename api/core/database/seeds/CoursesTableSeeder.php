<?php

use Illuminate\Database\Seeder;
use App\Course;

class CoursesTableSeeder extends Seeder
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
        Course::truncate();
        DB::statement("SET foreign_key_checks=1");

        for ($i = 0; $i < 10; $i++)
        {
            // fake entries
            $faker = Faker\Factory::create();
            Course::create([
                'title'  =>  title_case($faker->words(4, true)),
                'course_level_id'    =>  $faker->randomElement([1,2,3,4]),
                'added_by'  =>  1,
                'description'   =>  $faker->text
            ]);
        }
    }
}
