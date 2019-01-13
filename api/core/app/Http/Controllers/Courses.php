<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use App\User;
use App\CourseLevel;
use App\Course;

class Courses extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json([
            'status'    =>  'success',
            'courses'   => Course::with(['level', 'modules', 'addedBy'])->get()
        ], 200);
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
     * Search for a specific course
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function find()
    {

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
            'title' =>  'required|unique:courses',
            'course_level_id'   =>  'required|integer|exists:course_levels,id'
        ];

        $v = Validator::make( $request->all(), $rules );

        if($v->fails())
        {
            return response()->json([
                'status'    =>  'error',
                'message'   =>  'Invalid input detected',
                'errors'    =>  $v->errors()
            ], 400);
        }
        else
        {
            $nc = new Course();
            $nc->title = $request->get('title');
            $nc->course_level_id = $request->get('course_level_id');
            $nc->added_by = User::currentUser()->id;
            $nc->save();

            return response()->json([
                'status'    =>  'success',
                'message'   =>  'the course was successfully added',
                'course'    =>  $nc
            ],200);
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
            $course = Course::find($id);

            // bcz we can't call with() with find()
            $course->modules = $course->modules;
            $course->modules->each(function ($module) {
                $module->total_lessons = $module->lessons->count();
            });
            $course->level = $course->level;
            $course->added_by = $course->added_by;

            return response()->json([
                'status'    =>  'success',
                'course'    =>  $course
            ], 200);
        }
        else
        {
            return response()->json([
                'status'    =>  'not found',
                'message'    =>  'The course was not found'
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
            'title'    =>  'required|max:255',
            'description'   =>  'required|max:1000'
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
            $course = Course::find($id);

            $course->title = $request->get('title');
            $course->description = $request->get('description');
            $course->save();

            $course->modules = $course->modules;
            $course->level = $course->level;
            $course->added_by = $course->added_by;

            return response()->json([
                'status'    =>  'success',
                'message'   =>  'The cover photo has been uploaded',
                'course'   =>  $course
            ], 200);
        }

    }

    public function updateCoverPhoto(Request $request, $id)
    {
        $rules = [
            'id'    =>  'required|integer|exists:courses',
            'cover_photo'   =>  'required'
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
            $course = Course::find($id);
            $course->cover_photo_url = $request->get('cover_photo');
            $course->save();
            return response()->json([
                'status'    =>  'success',
                'message'   =>  'The cover photo has been uploaded',
                'cover_photo_url'   =>  $course->cover_photo_url
            ], 200);
            


        }


    }

    public function removeCoverPhoto(Request $request, $id)
    {
        $course = Course::find($id);
        if($course)
        {
            $course->cover_photo_url =  null;
            $course->save();
            return response()->json([
                'status'    =>  'success',
                'message'   =>  'The cover photo has been removed'
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
        // @TODO: Delete all realtional data
        Course::destroy($id);

    }
}
