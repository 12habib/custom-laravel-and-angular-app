<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = ['title', 'order', 'added_by', 'cover_photo_url', 'description'];

    public function addedBy()
    {
        return $this->belongsTo('App\User', 'added_by', 'id');
    }

    public function level(){
        return $this->belongsTo('App\CourseLevel', 'course_level_id', 'id');
    }

    public function modules()
    {
        return $this->hasMany('App\CourseModule', 'course_id', 'id');
    }


}
