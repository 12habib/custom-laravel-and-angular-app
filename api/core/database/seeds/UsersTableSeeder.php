<?php

use Illuminate\Database\Seeder;
use App\User;
use Illuminate\Support\Facades\DB;

class UsersTableSeeder extends Seeder
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
        User::truncate();
        DB::statement("SET foreign_key_checks=1");

        // add the admin user
        User::create([
            'name'  =>  'Administrator',
            'email' =>  'devs@digcy.io',
            'password'  =>  bcrypt('passpass'),
            'user_type' =>  41, // admin
            'active'    =>  1
        ]);


        for ($i = 0; $i < 50; $i++)
        {
            // fake entries
            $faker = Faker\Factory::create();
            User::create([
                'name'  =>  $faker->name,
                'email' =>  $faker->email,
                'password'  =>  bcrypt($faker->password),
                'user_type' =>  $faker->randomElement([1,2]),
                'active'    =>  $faker->randomElement([0,1])
            ]);
        }

    }
}
