<?php

namespace App\Http\Controllers;

use App\AssessmentTest;
use App\User;
use Illuminate\Http\Request;
use Validator;

class Users extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * @return mixed
     * @throws \Exception
     */
    public function index()
    {
        return datatables()
            ->of(User::query())
            ->addColumn('type', function ($user) {
                switch ($user->user_type){
                    case 104:
                        return 'Admin';
                        break;

                    case 2:
                        return 'Editor';
                        break;

                    default:
                        return 'User';
                        break;
                }

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
            'name'  =>  'required|min:2',
            'email' =>  'required|unique:users,email,',
            'active' => 'required|boolean',
            'user_type' => 'required|integer',
            'password'  =>  'required|min:8|max:12'
        ];


        $v = Validator::make($request->all(), $rules);

        if($v->fails())
        {
            return response()->json([
                'status'    =>  'error',
                'message'   =>  'form invalid',
                'errors'    =>  $v->errors()
            ], 400);
        }
        else
        {
            $data = $request->all();
            $data['password'] = bcrypt($request->get('password'));

            $user = User::create($data);

            return response()->json([
                'status'    =>  'success',
                'message'   =>  'user updated',
                'user'      =>  $user
            ], 200);

            // TODO: Inform the user
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
        if(! is_null($id) )
        {
            $user = User::find($id);
            $data = [];
            $status = empty($user) ? 404 : 200;
            $data['status'] = empty($user) ? 'not found' : 'success';
            $data['user'] = $user;

            return response()->json($data, $status);
        }
        else
        {
            return response()->json('not allowed', 401);
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
        if( is_null($id) )
        {
            return response()->json([
                'status' => 'not found',
                'message'=> 'invalid URL'
            ], 404);
        }
        else
        {
            $user = User::find($id);
            if( !is_null($user) )
            {
                $rules = [
                    'name'  =>  'required|min:2',
                    'email' =>  'required|unique:users,email,' . $id,
                    'active' => 'required|boolean',
                    'user_type' => 'required|integer'
                ];
                if($request->get('password') != null)
                    $rules['password']  =  'min:8|max:12';


                $v = Validator::make($request->all(), $rules);

                if($v->fails())
                {
                    return response()->json([
                        'status'    =>  'error',
                        'message'   =>  'form invalid',
                        'errors'    =>  $v->errors()
                    ], 400);
                }
                else
                {
                    $data = $request->all();
                    if($request->has('password'))
                    {
                        $data['password'] = bcrypt($request->get('password'));
                    }
                    else
                    {
                        unset($data['password']);
                    }

                    $user->update($data);

                    return response()->json([
                        'status'    =>  'success',
                        'message'   =>  'user updated',
                        'user'      =>  $user
                    ], 200);

                    // TODO: Inform the user
                }
            }
            else
            {
                return response()->json([
                    'status' => 'not found',
                    'message'=> 'invalid URL'
                ], 404);
            }



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
        // TODO: Delete all data related to the user?
        User::destroy($id);
        return response()->json([
            'status'    =>  'success',
            'message'   =>  'User deleted'
        ], 200);
    }

    function getIntelligenceProfile()
    {
        $user = User::currentUser();
        $last_test = AssessmentTest::where('email', $user->email)->orderBy('created_at', 'DESC')->first();
        return response()->json([
            'status'    =>  'success',
            'info'      =>  $last_test
        ], 200);
    }


    // EOF
}
