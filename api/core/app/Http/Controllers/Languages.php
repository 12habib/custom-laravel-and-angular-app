<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Language;

class Languages extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json([
            'languages' => Language::orderBy('name','ASC')->get()
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
        $rules = [
            'name' => 'required|min:2|max:150',
            'abbr' => 'required|min:2|max:5|unique:languages'
        ];
        
        $request->validate($rules);
        
        // save teh new language
        $language = new Language();
        $language->name = $request->get('name');
        $language->abbr = $request->get('abbr');
        $language->save();
        
        return response()->json([
            'data'  =>  Language::orderBy('name','ASC')->get()
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if(!is_null($id))
        {
            return response()->json([
                'language'  =>  Language::find($id)
            ]);
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
        $language = Language::find($id);
        if(is_null($language)) 
        {
            return response()->json(['msg' => 'not found'], 404);
        }
        
        $rules = [
            'name' => 'required|min:2|max:150',
            'abbr' => 'required|min:2|max:5|unique:languages,abbr,' . $id
        ];
        
        $request->validate($rules);
        
        $language->name = $request->get('name');
        $language->abbr = $request->get('abbr');
        $language->save();
        
        return response()->json([
            'data' => $language
        ], 200);
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
            Language::destroy($id);
            return response()->json([
                'msg'  =>  'Language deleted'
            ], 200);
        }
    }
}
