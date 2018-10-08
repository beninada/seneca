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
    $sql = 'select users.id, users.email, users.f_name, users.l_name, users.u_name, fund_user.fund_id, fund_user.role
            from users
            left join fund_user on users.id = fund_user.user_id;';

    $users = \DB::select($sql);

    return \Response::json($users, 200);
});

Route::get('/test', function (Request $request) {
    \Log::info('test log');
    return \Response::json(['yep works'], 200);
});
