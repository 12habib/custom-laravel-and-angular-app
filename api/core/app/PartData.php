<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PartData extends Model
{
    protected $table = 'part_data';
    protected $fillable = ['part_title', 'added_by', 'intelligence_id', 'screens', 'exercise_id', 'published'];

    public function exercise()
    {
        return $this->belongsTo('App\Exercise');
    }

    public function intelligence()
    {
        return $this->belongsTo('App\Intelligence');
    }

}
