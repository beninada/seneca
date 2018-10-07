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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/user', function (Request $request) {
    $registerController = new RegisterController();
    $response = $registerController->create($request->all());

    return \Response::json($response, 200);
});
