<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UsersTableSeeder::class);
        $this->call(IntelligencesTableSeeder::class);
        $this->call(CourseLevelSeeder::class);
        $this->call(CoursesTableSeeder::class);
        $this->call(CourseModuleSeeder::class);
        $this->call(TestQuestionsTableSeeder::class);
    }
}
