<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Exercise extends Model
{
    protected $fillable = ['lesson_id', 'public', 'title'];

    public function lesson()
    {
        return $this->belongsTo('App\lesoon');
    }

    public function parts()
    {
        return $this->hasMany('App\PartData');
    }

    public static function addAllIntelligenceVariations($exercise_id = null)
    {
        if($exercise_id != null)
        {
            $intelligences = Intelligence::all();
            $i = 0;

            foreach ($intelligences as $intel)
            {
                PartData::create([
                    'part_title' => '',
                    'intelligence_id'   =>  $intel->id,
                    'exercise_id'   =>  $exercise_id,
                    'added_by'  =>  User::currentUser()->id,
                    'screens'   =>  '',
                    'published' =>  false

                ]);

                $i++;

                if($i == $intelligences->count())
                {
                    return true;
                }

            }

        }
        return false;
    }


    public static function set_public_status($id, $status)
    {
        if( !is_null($id) && !is_null($status) )
        {
            $ex = self::find($id);
            $ex->public = $status;
            return $ex->save();
        }
    }

    /**
     * @param $id
     * @return bool
     */
    public static function hasUnpublishedParts($id)
    {
        $count = PartData::where('exercise_id', $id)->where('published', false)->count();

        return $count > 0;
    }

    // eof
}
