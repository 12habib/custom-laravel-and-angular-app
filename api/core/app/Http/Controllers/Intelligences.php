<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Intelligence;
use Validator;

class Intelligences extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $intels = Intelligence::orderBy('title', 'ASC')->with('addedBy')->get();
        return response()->json($intels, 200);
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
            'title' => 'required|unique:intelligences,title'
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
            $intel = new Intelligence();
            $intel->create([
                'title' => $request->get('title'),
                'added_by'  =>  User::currentUser()->id
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'the intelligence was added',
                'data'  =>  Intelligence::orderBy('title', 'ASC')->with('addedBy')->get()
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
        //
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
        if( !is_null($id) && !is_null(Intelligence::find($id)) )
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
                $intel = Intelligence::find($id);
                $intel->update(['title' => $request->get('title')]);

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
            Intelligence::destroy($id);
            return response()->json([
                'status' => 'success',
                'message' => 'the intelligence was removed'
            ], 200);
        }
    }
}
