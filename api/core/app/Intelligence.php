<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Intelligence extends Model
{
    protected $fillable = ['title', 'added_by'];

    public function addedBy()
    {
        return $this->belongsTo('App\User', 'added_by', 'id');
    }
}
