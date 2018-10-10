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

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['managers'];

    public function users()
    {
        return $this->belongsToMany('App\User');
    }

    public function holdings()
    {
        return $this->hasMany('App\Holding');
    }

    public function getManagersAttribute() {
        return \DB::select(
            'select users.id, users.u_name from users
            join fund_user on users.id = fund_user.user_id
            where fund_user.role="manager" and fund_user.fund_id = ' . $this->id
        );
    }
}
