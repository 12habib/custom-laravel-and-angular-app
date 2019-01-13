<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LessonProfile extends Model
{
    protected $fillable = ["user_id", "lesson_id", "profile"];

    static function getUserLP($user_id, $lesson_id)
    {
        if( $user_id && $lesson_id )
        {
            return self::where('user_id', $user_id)->where('lesson_id', $lesson_id)->first();
        }
    }
}
