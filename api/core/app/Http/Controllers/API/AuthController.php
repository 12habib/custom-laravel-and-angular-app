<?php

namespace App\Http\Controllers\API;

use App\Mail\NotifyPasswordReset;
use App\Mail\SendActivationCode;
use App\Mail\PasswordResetToken;
use Illuminate\Auth\Passwords\PasswordBroker;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Validator;
use App\User;
use App\URLModel;

class AuthController extends Controller
{

    private $passwords;


    public function __construct(PasswordBroker $passwords)
    {
        $this->passwords = $passwords;
    }

    /**
     * Logs a user in
     * Returns token and user info
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        // api/v* is for learners
        // api/* is for admins
        $is_not_admin_panel = str_contains($request->fullUrl(), 'api/v') ;

        $auth_array = ['email' => \request('email'), 'password' => \request('password'), 'active' => 1];

        $auth_array['user_type'] = $is_not_admin_panel ? User::LEVEL_USER : User::LEVEL_ADMIN;

        if(Auth::attempt($auth_array))
        {
            $user = Auth::user();
            $data['status']     =   'success';
            $data['message']    =   'Login success';
            $data['user']       =   $user;
            $data['token']      =   $user->createToken('MyApp')->accessToken;

            $user->update([
                'last_login_location' => \request()->ip(),
                'last_login_at' => now()
            ]);

            return response()->json($data, 200);
        }
        else
        {
            return response()->json(['status' => 'error', 'message' => 'Login failed'], 401);
        }

    }

    public function register(Request $request)
    {
        // validation rules
        $rules = [
            'name'  =>  'required|min:2|max:250',
            'email' =>  'required|email|unique:users',
            'password'  =>  'required|min:8|max:12',
            'password_confirmation' =>  'required|same:password'
        ];

        // validate our input
        $v = Validator::make( $request->all(), $rules );

        if( $v->fails() )
        {
            // this is why we use the static validation method
            return response()->json(['status' => 'error', 'errors' => $v->errors()], 400); // bad request
        }

        // if didn't fail, let's register the user
        $info = $request->all();
        // encrypt the password
        $info['password']   = bcrypt( $request->get('password') );
        $info['active']     = 0;
        $info['user_type']  = User::LEVEL_USER;
        $info['activation_key'] =   sha1($info['email'] . time());
        // create the user
        $user = User::create($info);

        // prepare the return data
        $data['status']     = 'success';
        $data['message']    = 'Registration successful';
        $data['user']       = $user;

        Mail::to($user->email)
            ->send(new SendActivationCode([
                'user' => $user,
                'activation_key' => $info['activation_key']
            ]));

        return response()->json($data, 200);
    }

    public function activate()
    {
        $code = \request('code');
        $user = User::where('activation_key', $code)->where('active', 0)->first();

        if( !is_null($user) )
        {
            $user->update([
                'active' => 1,
                'activation_key'    =>  null
            ]);

            return response()->json([
                'status'    =>  'success',
                'message'   =>  'Account verified',
            ], 200);
        }
    }

    public function forgotPassword(Request $request)
    {
        $rules = ['email' => 'required|email|exists:users,email'];

        $request->validate($rules);

        

        // data valid
        $email = $request->get('email');
        $user = User::where('email', $email)->first(); 
        if($user->user_type == User::LEVEL_USER){
            $is_not_admin_panel = true;
        }else{
            $is_not_admin_panel = false;
        }



        $token = User::generateResetToken($email);  // get a token made

        if($token)
        {

            Mail::to($user->email)
                ->send(new PasswordResetToken([
                    'user' => $user,
                    'token' => $token,
                    'is_not_admin_panel'   => $is_not_admin_panel
                ]));

            return response()->json(['msg' => 'Email sent'], 200);

        }
        else
        {
            return response()->json(['msg' => 'There was an error'], 400);
        }

    }

    public function doResetPw(Request $request)
    {
        $rules = [
            'email' => 'required|email|exists:users,email',
            'password'  =>  'required|min:6|max:20',
            'password_confirmation' =>  'required|same:password',
            'token' =>  'required'
        ];

        $request->validate($rules);

        // data valid
        $email = $request->get('email');
        $user = User::where('email', $email)->first(); // no need to validate, validator has done it for us
        $token = $request->get('token');  // get a token made

        $tokenEntry = DB::table('password_resets')
            ->where('token', urlencode($token))
            ->where('email', $email)
            ->first();



        if($tokenEntry && $user)
        {
            // save the new password
            $user->password = bcrypt($request->get('password'));
            $user->save();

            // delete all such tokens generated for the user
            DB::table('password_resets')
                ->where('token', urlencode($token))
                ->where('email', $email)
                ->delete();

            // send the confirmation email
            Mail::to($user->email)
                ->send(new NotifyPasswordReset([
                    'user' => $user
                ]));

            // response
            return response()->json(['msg' => 'Email sent'], 200);

        }
        else
        {
            return response()->json(['msg' => 'There was an error'], 400);
        }

    }


    // EOF
}
