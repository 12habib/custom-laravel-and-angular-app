<?php

use Illuminate\Database\Seeder;

class TestQuestionsTableSeeder extends Seeder
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
        \App\TestQuestion::truncate();
        DB::statement("SET foreign_key_checks=1");

        $intelligences = App\Intelligence::all();
        $random = random_int(3, 5);

        foreach ($intelligences as $intelligence)
        {


            for ($i = 0; $i < $random; $i++)
            {
                $faker = Faker\Factory::create();

                \App\TestQuestion::create([
                    'intelligence_id' => $intelligence->id,
                    'body' => $faker->text,
                    'added_by' => 1,
                ]);

            }
        }
    }
}
