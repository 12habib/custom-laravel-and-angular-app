<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    protected $fillable = [
        'module_id',
        'title',
        'order',
        'active',
        'added_by',
        'description'
    ];

    public function addedBy()
    {
        return $this->belongsTo('App\User', 'added_by', 'id');
    }

    public function module()
    {
        return $this->belongsTo('App\CourseModule', 'module_id');
    }

}
