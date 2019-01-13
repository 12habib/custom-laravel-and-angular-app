<?php

namespace App\Http\Controllers;

use App\CourseModule;
use Illuminate\Http\Request;
use Validator;
use App\User;
use App\Course;


class CourseModules extends Controller
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
            'course_id' =>  'required|exists:courses,id',
            'free'  =>  'required|boolean'
        ];

        if ( $request->get('free') == false )
        {
            $rules['price'] =  'required|numeric|min:1';
        }

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

            $course_id = $request->get('course_id');
            $max_order = \DB::table('course_modules')->where('course_id', $course_id)->max('order') || 0;
            $next_order = $max_order + 1;

            $module = new CourseModule();
            $module->title = $request->get('title');
            $module->course_id = $course_id;
            $module->active = $request->get('active', true);
            $module->free = $request->get('free', false);
            $module->price = $request->get('price');
            $module->order = $next_order;
            $module->added_by = User::currentUser()->id;
            $module->save();


            $course = Course::find($course_id);
            $course->modules = $course->modules;
            $course->level = $course->level;
            $course->added_by = $course->added_by;



            return response()->json([
                'status'    =>  'success',
                'message'   =>  'The module has been added',
                'course'    =>  $course,
                'module'    =>  $module
            ], 200);
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
        $not_found = false;
        if($id)
        {
            $cm = CourseModule::find($id);
            if( ! $cm )
            {
                $not_found = true;
            }
            else
            {
                $cm->lessons = $cm->lessons;
                return response()->json([
                    'status'    =>  'success',
                    'message'   =>  'module found',
                    'module'    =>  $cm
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
                'message'   =>  'Module not found'
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
            'title' =>  'required|min:2|max:250',
            'free'  =>  'required|boolean'
        ];

        if ( $request->get('free') == false )
        {
            $rules['price'] =  'required|numeric|min:1';
        }

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
            $module = CourseModule::find($id);
            $module->title = $request->get('title');
            $module->active = $request->get('active', true);
            $module->free = $request->get('free', false);
            $module->price = $request->get('price');
            $module->save();


            $course = Course::find($module->course_id);
            $course->modules = $course->modules;
            $course->level = $course->level;
            $course->added_by = $course->added_by;



            return response()->json([
                'status'    =>  'success',
                'message'   =>  'The module has been added',
                'course'    =>  $course,
                'module'    =>  $module
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
        CourseModule::destroy($id);
        return response()->json([
            'status'    =>  'success',
            'message'   =>  'The module has been deleted'
        ], 200);
    }
}
