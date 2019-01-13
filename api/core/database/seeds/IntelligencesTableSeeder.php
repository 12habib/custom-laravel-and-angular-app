<?php

use Illuminate\Database\Seeder;
use App\Intelligence;

class IntelligencesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $intelligences = [
            "Hands",
            "Categorization",
            "Logical",
            "Visual/Spatial",
            "Intrapersonal",
            "Verbal/Oral",
            "Bodily",
            "Verbal/Writing",
            "Musical"
        ];

        foreach ($intelligences as $intel)
        {
            Intelligence::create([
                'title' =>  $intel,
                'added_by'  =>  1
            ]);
        }

    }
}
