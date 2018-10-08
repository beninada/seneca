<?php

use Illuminate\Database\Seeder;

class UsersAndFundsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\UserProfile::class, 50)->create();
        factory(App\Fund::class, 20)->create();
        factory(App\Ticker::class, 100)->create();
    }
}
