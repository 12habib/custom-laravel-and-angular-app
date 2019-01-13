<?php

use Illuminate\Database\Seeder;
use App\CourseModule;

class CourseModuleSeeder extends Seeder
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
        CourseModule::truncate();
        DB::statement("SET foreign_key_checks=1");

        for ($i = 0; $i < 10; $i++)
        {
            $random = random_int(4, 8);
            for ($j = 0; $j < $random; $j++ )
            {
                // fake entries
                $faker = Faker\Factory::create();
                CourseModule::create([
                    'title'  =>  title_case($faker->words(2, true)),
                    'order'    =>  $i,
                    'added_by'  =>  1,
                    'course_id' => $i + 1
                ]);
            }

        }
    }
}
