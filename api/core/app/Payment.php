<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = ['user_id', 'amount', 'gateway', 'gateway_data', 'module_id'];

    public function module()
    {
        return $this->belongsTo('App\CourseModule', 'module_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo('App\User', 'user_id', 'id');
    }
}
