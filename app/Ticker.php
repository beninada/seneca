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
        'name',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [];

    public function holding()
    {
        return $this->belongsToMany('App\Holding');
    }
}