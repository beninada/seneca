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

Route::post('/auth/register', function (Request $request) {
    $registerController = new RegisterController();
    return $registerController->create($request);
});

Route::get('/auth/check', function (Request $request) {
    $user = Auth::user();

    if ($user) {
        $fullUser = \App\User::where('id', $user->id)->with('profile')->first();
        return \Response::json($fullUser, 200);
    } else {
        return \Response::json([], 401);
    }
});

Route::post('/auth/login', function (Request $request) {
    $credentials = [
        'email' => $request->input('email'),
        'password' => $request->input('password')
    ];

    $attempt = Auth::attempt($credentials, true);

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

Route::put('/users/{id}', function (Request $request, $id) {
    $user = \App\User::find($id);

    if ($request->input('u_name') != $user->u_name) {
        $user->u_name = $request->input('u_name');
    }

    $user->f_name = $request->input('f_name');
    $user->l_name = $request->input('l_name');
    $user->save();

    $userProfile = \App\UserProfile::where('user_id', $user->id)
                                    ->update([
                                        'city' => $request->input('city'),
                                        'country' => $request->input('country'),
                                        'bio' => $request->input('bio')
                                    ]);

    $response = \App\User::where('id', $id)->with('profile')->first();

    return \Response::json($response, 200);
})->middleware('auth');

Route::post('/funds', function (Request $request) {
    $fund = new \App\Fund;
    $fund->name = $request->input('name');
    $fund->prospectus = $request->input('prospectus');
    $fund->save();

    foreach ($request->input('tickers') as $ticker) {
        $ticker = \App\Ticker::firstOrCreate(['symbol' => strtoupper($ticker)], ['name' => '']);

        $holding = new \App\Holding;
        $holding->fund_id = $fund->id;
        $holding->ticker_id = $ticker->id;
        $holding->save();
    }

    // TODO: make all funds belong to user id 1 as manager for now
    \DB::insert('insert into fund_user (fund_id, user_id, role, updated_at, created_at)
        values (' . $fund->id . ', ' . $request->input('user_id') . ', "manager", "' . date('Y-m-d H:i:s') . '", "' . date('Y-m-d H:i:s') . '")');

    return \Response::json($fund, 200);
})->middleware('auth');

Route::put('/funds/{id}', function (Request $request, $id) {
    $fund = \App\Fund::find($id);
    $fund->name = $request->input('name');
    $fund->prospectus = $request->input('prospectus');
    $fund->save();

    // TODO: naively kill all holdings belonging to this fund and create new ones
    \App\Holding::query()->where('fund_id', $fund->id)->delete();

    foreach ($request->input('tickers') as $ticker) {
        $ticker = \App\Ticker::firstOrCreate(['symbol' => strtoupper($ticker)], ['name' => '']);

        $holding = new \App\Holding;
        $holding->fund_id = $fund->id;
        $holding->ticker_id = $ticker->id;
        $holding->save();
    }

    $response = \App\Fund::with(['holdings', 'users'])->get()->find($id);

    return \Response::json($response, 200); 
})->middleware('auth');

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
