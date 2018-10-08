<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Auth\RegisterController as RegisterController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/users', function (Request $request) {
    $registerController = new RegisterController();
    $response = $registerController->create($request->all());

    return \Response::json($response, 200);
});

Route::get('/users', function (Request $request) {
    return \Response::json([], 200);
});

Route::get('/test', function (Request $request) {
    \Log::info('test log');
    return \Response::json(['yep works'], 200);
});
