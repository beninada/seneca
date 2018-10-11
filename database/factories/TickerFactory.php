<?php

use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(App\Ticker::class, function (Faker $faker) {
    $company = $faker->company;
    $symbol = strtoupper(substr($company, 0, 3));

    return [
        'name' => $company,
        'symbol' => $symbol->unique(),
    ];
});
