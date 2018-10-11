<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ticker extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'symbol',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [];

    public function holdings()
    {
        return $this->belongsToMany('App\Holding');
    }
}
