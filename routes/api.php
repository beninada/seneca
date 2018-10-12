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

Route::post('/auth/register','Auth\RegisterController@create');

Route::get('/auth/check', function (Illuminate\Http\Request $request) {
    $user = Auth::user();

    if ($user) {
        $fullUser = \App\User::where('id', $user->id)->with('profile')->first();
        return \Response::json($fullUser, 200);
    } else {
        return \Response::json([], 401);
    }
});

Route::post('/auth/login', function () {
    $credentials = [
        'email' => Input::get('email'),
        'password' => Input::get('password')
    ];

    $attempt = Auth::attempt($credentials, true, true);

    if ($attempt) {
        Auth::loginUsingId(Auth::user()->id);
        return \Response::json(Auth::user(), 200);
    } else {
        return \Response::json([], 401);
    }
});

Route::post('/auth/logout', function () {
    Auth::logout();
    return \Response::json([], 200);
});

Route::post('/users', function (Request $request) {
    $registerController = new RegisterController();
    $response = $registerController->create($request->all());

    return \Response::json($response, 200);
});

Route::get('/users', function (Request $request) {
    $response = [];

    if ($request->all) {
        $sql = 'select distinct users.id, users.email, users.f_name, users.l_name, users.u_name, fund_user.role
                from users
                join fund_user on users.id = fund_user.user_id';

        $response = \DB::select($sql);
    }

    if ($request->u_name) {
        $response = \App\User::where('u_name', $request->u_name)->with('profile')->first();
    }

    return \Response::json($response, 200);
});

Route::post('/funds', function (Request $request) {
    $requestBody = json_decode($request->getContent());
    
    $fund = new \App\Fund;
    $fund->name = $requestBody->name;
    $fund->prospectus = $requestBody->prospectus;
    $fund->save();

    foreach ($requestBody->tickers as $requestTicker) {
        $ticker = \App\Ticker::firstOrCreate(['symbol' => strtoupper($requestTicker)], ['name' => '']);

        $holding = new \App\Holding;
        $holding->fund_id = $fund->id;
        $holding->ticker_id = $ticker->id;
        $holding->save();
    }

    // TODO: make all funds belong to user id 1 as manager for now
    \DB::insert('insert into fund_user (fund_id, user_id, role, updated_at, created_at)
        values (' . $fund->id . ', 1, "manager", "' . date('Y-m-d H:i:s') . '", "' . date('Y-m-d H:i:s') . '")');

    return \Response::json($fund, 200);
});

Route::get('/funds', function (Request $request) {
    $response = [];

    if ($request->all) {
        $response = \App\Fund::all();
    }

    if ($request->id) {
        $response = \App\Fund::with(['holdings', 'users'])->get()->find($request->id);
    }

    return \Response::json($response, 200);
});

Route::get('/test', function (Request $request) {
    \Log::info('test log');
    return \Response::json(['yep works'], 200);
});
