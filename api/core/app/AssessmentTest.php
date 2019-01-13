<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AssessmentTest extends Model
{
    protected $fillable = [
        'token',
        'email',
        'intelligence_profile',
        'top_five',
        'final_score',
    ];

    static function generateUniqueToken($email)
    {
        $string = $email . time();
        return bcrypt($string);
    }

    static function getTopFive($user_id = null)
    {
        if( !is_null($user_id) )
        {
            $user = User::find($user_id);
            $at = self::where('email', $user->email)->orderBy('created_at', 'DESC')->first();
            return $at->top_five;
        }
    }

}
