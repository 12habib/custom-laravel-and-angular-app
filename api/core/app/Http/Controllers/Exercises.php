<?php

namespace App\Http\Controllers;

use App\Exercise;
use App\PartData;
use Illuminate\Http\Request;

class Exercises extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store()
    {
        /**
         * This is a 3 step process
         * Step 1: Validate
         * Step 2: Add the Exercise
         * Step 3: Add all the empty parts for all the Intelligences
         */
        $rules = [
            'title' => 'required|min:2|max:34',
            'lesson_id' =>  'required|exists:lessons,id'
        ];

        request()->validate($rules);

        // data is valid
        $exer = new Exercise();
        $exer->title = \request('title');
        $exer->lesson_id = \request('lesson_id');
        $exer->public = \request('public', false);
        $exer->exercise_order = Exercise::where('lesson_id', \request('lesson_id'))->count() + 1;
        $exer->save();

        if(Exercise::addAllIntelligenceVariations($exer->id))
        {
            return response()->json([
                'status'    =>  'success',
                'message'   =>  'The exercise and its parts were successfully added',
                'exercise'  =>  $exer,
                'parts'     =>  $exer->parts
            ], 200);
        }
        else
        {
            // no point adding a defective entry
            // delete it
            $exer->delete();

            return response()->json([
                'status'    =>  'error',
                'message'   =>  'The exercise was successfully added, but the parts were not properly added'
            ], 400);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if($id)
        {
            $ex = Exercise::find($id);
            if($ex)
            {
                $parts = PartData::where('exercise_id', $id)->with('intelligence')->get();
                return response()->json([
                    'status'    =>  'success',
                    'exercise'  =>  $ex,
                    'parts'     =>  $parts
                ], 200);
            }
            else
            {
                return response()->json([
                    'status'    =>  'error',
                    'message'  =>  'item not found'
                ], 404);
            }
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if($id)
        {
            // first delete all the parts
            PartData::where('exercise_id', $id)->delete();
            // now we delete the exercise
            Exercise::destroy($id);
            // TODO: Make sure to delete all other related data if any comes up
            return response()->json([
                'status'    =>  'success',
                'message'   => 'The exercise and all of its parts have been deleted'
            ],200);
        }
    }

    public function get_by_lesson_id( $lesson_id )
    {
        if( !is_null( $lesson_id ) )
        {
            $exercises = Exercise::where('lesson_id', $lesson_id)->orderBy('exercise_order','ASC')->with('parts')->get();

            return response()->json([
                'status'    =>  'success',
                'exercises' => $exercises
            ],200);
        }
    }

    public function update_status()
    {
        $rules = [
            'id'   =>  'required|exists:exercises,id',
            'status'        =>  'required|boolean'
        ];

        request()->validate($rules);


        // passed

        // first we check if the exercise has unpublished parts
        if(Exercise::hasUnpublishedParts(\request('id')) && \request('status') == true)
        {
            return response()->json([
                'status'    =>  'error',
                'message'   =>  'exercise has unpublished parts'
            ],400);
        }

        // no unpublished parts were found OR the status is to be set to private

        $update = Exercise::set_public_status(\request('id'), \request('status'));
        if($update)
        {
            return response()->json([
                'status'    =>  'success'
            ],200);
        }
        else
        {
            return response()->json([
                'status'    =>  'error',
                'message'   =>  'error updating status'
            ],400);
        }

    }

    public function update_title()
    {
        $rules = [
            'id'        =>  'required|exists:exercises,id',
            'title'     =>  'required|min:2|max:34'
        ];

        request()->validate($rules);

        // passed

        $ex = Exercise::find(\request('id'));
        if($ex)
        {
            $ex->title = \request('title');
            $ex->save();
            return response()->json([
                'status'    =>  'success',
                'message'   =>  'title updated'
            ],200);
        }
        else
        {
            return response()->json([
                'status'    =>  'error',
                'message'   =>  'error updating exercise title'
            ],400);
        }
    }





    // eof
}
