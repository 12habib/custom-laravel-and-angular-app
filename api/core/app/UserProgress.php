<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserProgress extends Model
{
    protected $table = 'user_progress';
    protected $fillable = ['lesson_id', 'user_id', 'data'];
    
    static function getProgress($user_id = null, $lesson_id = null) {
        return self::where('lesson_id', $lesson_id)->where('user_id', $user_id)->orderBy('updated_at','DESC')->first();
    }
}
