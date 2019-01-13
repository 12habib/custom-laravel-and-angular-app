<?php

use Illuminate\Database\Seeder;
use App\Lesson;
use App\CourseModule;
use App\Course;

class LessonsTableSeeder extends Seeder
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
        Lesson::truncate();
        DB::statement("SET foreign_key_checks=1");

        $modules = CourseModule::all();

        foreach ($modules as $module)
        {
            $random = random_int(4, 10);

            for ($i = 0; $i < $random; $i++)
            {
                $faker = Faker\Factory::create();

                Lesson::create([
                    'module_id' => $module->id,
                    'title' => title_case($faker->words(4, true)),
                    'active' => $faker->randomElement([0,1]),
                    'added_by' => 1,
                    'description' => $faker->text,
                ]);

            }
        }

    }
}
