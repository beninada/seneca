<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Fund extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'prospectus',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [];

    public function users()
    {
        return $this->belongsToMany('App\User');
    }

    public function holdings()
    {
        return $this->hasMany('App\Holding');
    }
}
