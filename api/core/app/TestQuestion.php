<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TestQuestion extends Model
{
    protected $fillable = [
        'intelligence_id',
        'body',
        'active',
        'added_by'
    ];



    public function addedBy()
    {
        return $this->belongsTo('App\User', 'added_by', 'id');
    }

    public function intelligence()
    {
        return $this->belongsTo('App\Intelligence');
    }

    static function getAnswerScore($answer)
    {

        switch ($answer)
        {
            case 1: return 100; break;
            case 2: return 75; break;
            case 3: return 50; break;
            case 4: return 25; break;
            case 5: return 0; break;
            default: return false; break;
        }

    }



    // eof
}
