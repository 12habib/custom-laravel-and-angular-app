<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CourseLevel extends Model
{
    protected $fillable = ['title', 'order', 'added_by'];

    public function addedBy()
    {
        return $this->belongsTo('App\User', 'added_by', 'id');
    }
    
    public function levelDetails() 
    {
        return $this->hasMany('App\LevelDetails');
    }

    static function fixOrderNumbers()
    {
        $levels = self::orderBy('order','ASC')->get();
        $levels->each(function($level, $key){
            $level->update(['order', $key + 1]);
        });
    }
}
