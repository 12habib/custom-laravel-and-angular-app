<?php

namespace App\Http\Controllers;
use App\User;
use Illuminate\Http\Request;
use App\TestQuestion;
use App\Intelligence;
use Validator;

class TestQuestions extends Controller
{
    /**
     * Display a listing of the Test Questions for assessment test Grouped By Intelligences.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $questions = [];

        $intelligences = Intelligence::all();

        foreach ($intelligences as $intelligence)
        {
            $arr = [];
            $arr['intelligence_id'] = $intelligence->id;
            $arr['intelligence_title']  =  $intelligence->title;
            $arr['questions']   =  TestQuestion::where('intelligence_id', $intelligence->id)->where('active', true)->take(4)->inRandomOrder()->get();
            $questions[] = $arr;
        }

        return response()->json([
            'status'    =>  'success',
            'questions' =>  $questions
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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $testQuestion= new TestQuestion();
        $testQuestion->intelligence_id = $request->get('intelligence_id');
        $testQuestion->body = $request->get('body');
        $testQuestion->added_by=User::currentUser()->id;
        $testQuestion->save();
        return response()->json([
            'status'=>'Test Question has been added successfully',
            'data'  =>  TestQuestion::orderBy('id', 'ASC')->get()
        ],200);

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
    public function update(Request $request, $id)
    {
        $updateTaskQuestion = TestQuestion::find($id);
        $updateTaskQuestion->body = $request->get('body');
        $updateTaskQuestion->save();
          return response()->json([
            'status'=>'Test Question has been updated successfully',
            'data'  =>  TestQuestion::orderBy('id', 'ASC')->get()
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
         TestQuestion::destroy($id);
    }
}
