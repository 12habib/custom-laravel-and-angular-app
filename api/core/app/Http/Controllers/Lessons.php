<?php

namespace App\Http\Controllers;

use App\Exercise;
use Validator;
use Illuminate\Http\Request;
use App\Lesson;
use App\CourseModule;
use App\Course;
use App\User;

class Lessons extends Controller
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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $rules = [
            'title' =>  'required|min:2|max:250',
            'module_id' =>  'required|exists:course_modules,id'
        ];

        $v = Validator::make($request->all(), $rules);

        if( $v->fails() )
        {
            return response()->json([
                'status'    =>  'error',
                'message'   =>  'Validation error',
                'errors'    =>  $v->errors()
            ], 400);
        }
        else
        {
            $module_id = $request->get('module_id');

            $lesson = new Lesson();
            $lesson->title = $request->get('title');
            $lesson->description = $request->get('description', null);
            $lesson->module_id = $module_id;
            $lesson->active = $request->get('active', true);
            $lesson->added_by = User::currentUser()->id;
            $lesson->save();

            return response()->json([
                'status'    =>  'success',
                'message'   =>  'The Lesson has been added',
                'lesson'    =>  $lesson
            ], 200);
        }
    }




    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id = null)
    {
        $not_found = false;
        if($id)
        {
            $lesson = Lesson::find($id);
            if( ! $lesson )
            {
                $not_found = true;
            }
            else
            {

                return response()->json([
                    'status'    =>  'success',
                    'message'   =>  'Lesson found',
                    'lesson'    =>  $lesson,
                    'module'    =>  $lesson->module,
                    'course'    =>  Course::find($lesson->module->course_id),
                ]);
            }
        }
        else
        {
            $not_found = true;
        }

        if($not_found)
        {
            return response()->json([
                'status'    => 'not found',
                'message'   =>  'Lesson not found'
            ], 404);
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
        $rules = [
            'title' =>  'required|min:2|max:250'
        ];

        $v = Validator::make($request->all(), $rules);

        if($v->fails())
        {
            return response()->json([
                'status'    =>  'error',
                'message'   =>  'Validation error',
                'errors'    =>  $v->errors()
            ], 400);
        }
        else
        {
            $lesson = Lesson::find($id);
            $lesson->title = $request->get('title');
            $lesson->active = $request->get('active', true);
            $lesson->description = $request->get('description', null);
            $lesson->save();

            return response()->json([
                'status'    =>  'success',
                'message'   =>  'The lesson has been updated'
            ], 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // @TODO: Delete relational data
        Lesson::destroy($id);
        return response()->json([
            'status'    =>  'success',
            'message'   =>  'The lesson has been deleted'
        ], 200);
    }

    public function update_exercise_sorting()
    {
        $rules = [
            'lesson_id'     =>  'required|exists:lessons,id',
            'sorting'       =>  'required'
        ];

        request()->validate($rules);

        // passed
//        $id = \request('lesson_id');
        $sorting = \request('sorting');

        foreach ($sorting as $key => $ex_id)
        {
            $ex = Exercise::find($ex_id);
            $ex->exercise_order = $key;
            $ex->save();
        }

        return response()->json([
            'status'    =>  'success',
            'message'   =>  'order updated'
        ],200);

    }
}
