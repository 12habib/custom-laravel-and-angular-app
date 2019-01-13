<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Validator;
use App\CourseLevel;
use App\Language;
use App\LevelDetails;


class CourseLevels extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $levels = CourseLevel::orderBy('order', 'ASC')->with('addedBy')->get();
        $languages = Language::orderBy('name', 'ASC')->get();
        
        if(!is_null($levels) && !is_null($languages))
        {
            $levels->each(function($level)
            {
                $level->details = LevelDetails::getLevelDetails($level->id);
            });
        }
        
        return response()->json($levels, 200);
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
            'title' =>  'required|unique:course_levels,title'
        ];

        $v = Validator::make($request->all(), $rules);

        if($v->fails())
        {
            return response()->json([
                'status' => 'input error',
                'message' => 'invalid input detected',
                'error' => $v->errors()
            ], 400);
        }
        else
        {
            $intel = new CourseLevel();

            $order_empty = is_null($request->get('order'));
            $order_next = \DB::table('course_levels')->max('order') + 1;

            if(!$order_empty)
            {
                CourseLevel::where('order', '>=', $request->get('order'))->increment('order', 1);
            }

            $intel->create([
                'title' => $request->get('title'),
                'order' => $order_empty ? $order_next : $request->get('order'),
                'added_by'  =>  User::currentUser()->id
            ]);


            return response()->json([
                'status' => 'success',
                'message' => 'the intelligence was added',
                'data'  =>  CourseLevel::orderBy('order', 'ASC')->with('addedBy')->get()
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
        if(!is_null($id))
        {
            $level = CourseLevel::find($id);
            
            if(!is_null($level))
            {
                
                
            }

            return response()->json($level, 200);
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
    public function update(Request $request, $id = null)
    {
        if( !is_null($id) && !is_null(CourseLevel::find($id)) )
        {
            $rules = [
                'title' => 'required|unique:intelligences,title,' . $id
            ];
            $v = Validator::make($request->all(), $rules);

            if($v->fails())
            {
                return response()->json([
                    'status' => 'input error',
                    'message' => 'invalid input detected',
                    'error' => $v->errors()
                ], 400);
            }
            else
            {
                $intel = CourseLevel::find($id);

                $order_empty = is_null($request->get('order'));
                $same_order = $intel->order === $request->get('order');
                $order_next = \DB::table('course_levels')->max('order') + 1;

                if(!$order_empty && !$same_order)
                {
                    CourseLevel::where('order', '>=', $request->get('order'))->increment('order', 1);
                }

                $intel->update([
                    'title' => $request->get('title'),
                    'order' => $order_empty ? $order_next : $request->get('order')
                ]);
                
                if(!$order_empty && !$same_order)
                    CourseLevel::fixOrderNumbers();

                
                // now we check if the level has details for each language
                // if it didn't have any for a language before, it will have a property named newDescription
                // and its details propery will be null
                
                $details = $request->get('details'); // arrays inside array
                
                foreach($details as $row)
                {
                    $language = $row['language'];
                    if(array_key_exists('newDescriptions', $row) )
                    {
                        LevelDetails::where('course_level_id', $id)->where('language_id', $language['id'])->delete();
                        LevelDetails::create([
                            'course_level_id'   =>  $id,
                            'language_id'       =>  $language['id'],
                            'descriptions'      =>  $row['newDescriptions']
                        ]);
                    }
                    else 
                    {
                        $details = LevelDetails::find($row['details']['id']);
                        $details->descriptions = $row['details']['descriptions'];
                        $details->save();
                    }
                }
                
                
                return response()->json([
                    'status' => 'success',
                    'message' => 'the intelligence was updated',
                    'data'  =>  $intel
                ], 200);
            }
        }
        else
        {
            return response()->json([
                'status' => 'error',
                'message' => 'invalid resource ID'
            ], 400);
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
        if(!is_null($id))
        {
            // @TODO: make sure all relational data is also removed to prevent errors
            CourseLevel::destroy($id);
            return response()->json([
                'status' => 'success',
                'message' => 'the intelligence was removed'
            ], 200);
        }
    }

    public function saveOrder(Request $request)
    {
        $obj = $request->get('order', null);
        if(!is_null($obj))
        {
            foreach ( $obj as $key => $id) {
                CourseLevel::find($id)->update(['order' => $key + 1]);
            }
            return response()->json([
                'status' => 'success',
                'message' => 'the order was saved'
            ], 200);
        }
        else
        {
            return response()->json([
                'status' => 'error',
                'message' => 'input error'
            ], 400);
        }

    }

}
