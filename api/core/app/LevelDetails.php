<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LevelDetails extends Model
{
    protected $fillable = ['course_level_id', 'language_id', 'descriptions'];
    
    public function level()
    {
        return $this->belongsTo('App\CourseLevel');
    }
    
    public function language()
    {
        return $this->belongsTo('App\Language');
    }
    
    static function getLevelDetails($level_id = null) 
    {
        if($level_id != null)
        {
            $data = [];
            
            $languages = Language::orderBy('name', 'ASC')->get();
            
            if(!is_null($languages))
            {
                foreach($languages as $lang)
                {
                    $row = [];
                    $row['language'] = $lang;
                    $row['details']  = LevelDetails::where('language_id',$lang->id)->where('course_level_id',$level_id)->first();
                    array_push($data, $row);
                }
                
            }
            return $data;
        }
    }
}
