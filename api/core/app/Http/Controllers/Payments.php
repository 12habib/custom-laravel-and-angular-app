<?php

namespace App\Http\Controllers;

use App\Payment;
use App\User;
use Illuminate\Http\Request;

class Payments extends Controller
{

    public function index()
    {
        return datatables()
            ->of(Payment::query())
            ->addColumn('module', function($model) {
                return $model->module;
            })
            ->addColumn('user', function($model) {
                return $model->user;
            })
            ->toJson();
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
            'module_id' =>  'required|exists:course_modules,id',
            'gateway_data'  =>  'required',
            'price'  =>  'required|numeric'
        ];

        $request->validate($rules);

        $pmt = new Payment();
        $pmt->user_id = User::currentUser()->id;
        $pmt->module_id = $request->get('module_id');
        $pmt->amount = $request->get('price');
        $pmt->gateway = $request->get('gateway', 'paypal');
        $pmt->gateway_data = \GuzzleHttp\json_encode($request->get('gateway_data'));
        $pmt->save();

        return response()->json([
            'status'    =>  'success',
            'message'   =>  'Payment stored',
            'entry'     =>  $pmt
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
        //
    }
}
