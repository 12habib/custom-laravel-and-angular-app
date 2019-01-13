<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;

class OneTimeLoginToken extends Model
{

    protected $fillable = ['user_id', 'token'];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    static function createToken($user_id)
    {
        if(! $user_id ) return;

        $arr = [
            'user_id'   => $user_id,
            'token'     => bcrypt($user_id . str_random(20))
        ];

        return self::create($arr);
    }
}
