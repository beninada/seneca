<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'f_name', 'l_name', 'u_name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['holdings'];

    public function profile()
    {
        return $this->hasOne('App\UserProfile');
    }

    // public function getFundsAttribute() {
    //     return \DB::select(
    //         'select funds.*, fund_user.role from funds
    //         join fund_user on funds.id = fund_user.fund_id
    //         where fund_user.user_id = ' . $this->id
    //     );
    // }

    public function getHoldingsAttribute() {
        return \DB::select(
            'select tickers.* from funds
            join fund_user on funds.id = fund_user.fund_id
            join holdings on funds.id = holdings.fund_id
            join tickers on holdings.ticker_id = tickers.id
            where fund_user.user_id = ' . $this->id
        );
    }
}
