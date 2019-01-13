<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;
use DB;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;


    const LEVEL_USER = 1;
    const LEVEL_MANAGER = 10;
    const LEVEL_ADMIN = 41;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'user_type', 'active', 'activation_key', 'last_login_location', 'last_login_at'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'activation_key'
    ];

    static function currentUser()
    {
        $user = auth()->guard('api')->user();
        
        if($user->course_level_id) {
            $user->level = CourseLevel::find($user->course_level_id);
            $user->level->details = LevelDetails::getLevelDetails($user->level->id);
        }
        return $user;
    }
    static function currentUserrepeat(){
        $user = auth()->guard('api')->user();
        return $user;
    }

    static function generateResetToken($email = null)
    {
        if(!is_null($email))
        {
            $token = urlencode(bcrypt($email . time()));
            DB::table('password_resets')->where('email', $email)->delete();
            $entry = DB::table('password_resets')->insert([
                'email' => $email,
                'token' => $token,
                'created_at'    =>  date('Y-m-d H:i:s')
            ]); // boolean

            if($entry)
                return $token;
            return false;
        }
    }



// EOF
}
