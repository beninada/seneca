<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\UserProfile;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\Request;
use Auth;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    public function validator(array $data)
    {
        return Validator::make($data, [
            'f_name' => 'string|max:255',
            'l_name' => 'string|max:255',
            'u_name' => 'string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    public function create(Request $request)
    {
        $requestBody = (array) json_decode($request->getContent());
        $validator = validator($requestBody);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        $user = new User;
        $user->f_name = $requestBody['f_name'] ? $requestBody['f_name'] : null;
        $user->l_name = $requestBody['l_name'] ? $requestBody['l_name'] : null;
        $user->email = strtolower(trim($requestBody['email']));
        $user->u_name = $requestBody['u_name'] ? trim($requestBody['u_name']) : $user->email;
        $user->password = Hash::make($requestBody['password']);
        $user->save();

        UserProfile::create([
            'user_id' => $user->id,
            'city' => isset($requestBody['city']) ? $requestBody['city'] : null,
            'country' => isset($requestBody['country']) ? $requestBody['country'] : null,
            'bio' => isset($requestBody['bio']) ? $requestBody['bio'] : null
        ]);

        Auth::login($user, true);

        return Auth::user();
    }
}
