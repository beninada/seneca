<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Holding extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'fund_id', 'ticker_id',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [];

    public function tickers() {
        return $this->hasMany('App\Ticker');
    }

    public function funds() {
        return $this->belongsToMany('App\Fund');
    }
}
