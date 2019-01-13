<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Course;

class CourseModule extends Model
{
    protected $fillable = ['course_id', 'title', 'active', 'added_by', 'order', 'free', 'price'];

    public function course()
    {
        return $this->belongsTo('App\Course');
    }

    public function lessons()
    {
        return $this->hasMany('App\Lesson', 'module_id');
    }

}
