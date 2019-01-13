<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use App\PartData;
use App\User;

class PartController extends Controller
{
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
            $part = PartData::find($id);
            if($part)
            {
                return response()->json([
                    'status'    =>  'success',
                    'part'      =>  $part,
                    'intelligence'  =>  $part->intelligence
                ], 200);
            }
            else
            {
                return response()->json([
                    'status'    =>  'not found',
                    'message'   =>  'item not found'
                ], 404);
            }
        }
    }

    public function store(Request $request)
    {
        $rules = [
            'screens' => 'required',
            'published' => 'required|boolean',
            'id'   =>  'required|exists:part_data,id',
        ];

        $v = Validator::make($request->all(), $rules);

        if($v->fails())
        {
            return response()->json([
                'status'    =>  'error',
                'message'   =>  'Validation errors',
                'errors'    =>  $v->errors()
            ], 400);
        }

        $pd = PartData::find($request->get('id'));
        $pd->part_title = $request->get('title');
        $pd->screens = $request->get('screens');
        $pd->published = $request->get('published');
        $pd->added_by = User::currentUser()->id;

        $pd->save();

        return response()->json([
            'status'    =>  'success',
            'message'   =>  'Part was saved'
        ], 200);


    }

    public function duplicate_content(Request $request)
    {
        $rules = [
            'from_id'   =>  'required|exists:part_data,id',
            'to_id'   =>  'required|exists:part_data,id',
        ];

        $v = Validator::make($request->all(), $rules);

        if($v->fails())
        {
            return response()->json([
                'status'    =>  'error',
                'message'   =>  'Validation errors',
                'errors'    =>  $v->errors()
            ], 400);
        }

        $from_data = PartData::find($request->get('from_id'))->screens;

        $to_entry = PartData::find($request->get('to_id'));
        $to_entry->screens = $from_data;
        $to_entry->added_by = User::currentUser()->id;
        $to_entry->save();

        return response()->json([
            'status'    =>  'success',
            'message'   =>  'Part was saved'
        ], 200);


    }


    /**
     * Get All Parts of a lesson
     */
    public function getPartsByLesson($lesson_id) {
        if($lesson_id)
        {
            $parts = PartData::select(['id', 'part_title', 'intelligence_id', 'created_at', 'updated_at', ])->with(['lesson', 'intelligence'])->where('lesson_id', $lesson_id)->get();

            return response()->json([
                'parts' => $parts
            ], 200);
        }
    }



    public function destroy(Request $request)
    {
        $r = ['id' => 'required|exists:part_data,id'];

        $v = Validator::make($request->all(), $r);


        if($v->fails())
        {
            return response()->json(['invalid id'], 400); // todo: make it proper
        }

        PartData::destroy(\request('id'));

        return response()->json(['success'], 200);
    }

}
