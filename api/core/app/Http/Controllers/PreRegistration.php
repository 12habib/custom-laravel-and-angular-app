<?php

namespace App\Http\Controllers;

use App\AssessmentTest;
use App\Mail\SendRegistrationInformation;
use Illuminate\Http\Request;
use App\TestQuestion;
use App\Intelligence;
use App\User;
use Validator;
use App\OneTimeLoginToken;
use Illuminate\Support\Facades\Mail;
use Auth;

class PreRegistration extends Controller
{
    public $questionnaire;

    /**
     * Sends a random assortment of questions from Assessment Test (equally distributed amongst all
     *
     * @return Response
     */
    public function sendQuestionnaire()
    {
        $this->questionnaire = [];

        $intels = Intelligence::all(); // intelligences

        foreach ($intels as $intel)
        {
            $questions = TestQuestion::where('intelligence_id', $intel->id)->where('active', true)->inRandomOrder()->select('id', 'body')->take(5)->get();
            $questions->each(function($q){
                array_push($this->questionnaire, $q);
            });


        }

        return response()->json([
            'status'    =>  'success',
            'questionnaire' =>  $this->questionnaire
        ], 200);

    }

    public function setLevel(Request $request)
    {
        $rules = [
            'level' => 'required|integer|exists:course_levels,id',
            'token' =>  'required|exists:assessment_tests,token'
        ];

        $request->validate($rules);

        // valid
        $assessmentTest = AssessmentTest::where('token', $request->get('token'))->first();
        if($assessmentTest)
        {
            $assessmentTest->level = $request->get('level');
            $assessmentTest->save();
            return response()->json([
                'msg'   =>  'success'
            ], 200);
        }


    }

    /**
     * Gets answers from POST and sends back an intelligence profile
     * @param Request $request
     * @return Response
     */
    public function getProfile(Request $request)
    {
        $rules = [
            'email' =>  'required|email|unique:users,email',
            'name' =>  'required|min:2|max:150',
            'answers'   =>  'required'
        ];
        $request->validate($rules);

//        if($validator->fails())
//        {
//            return response()->json([
//                'status'    =>  'error',
//                'mesage'    =>  'invalid input detected'
//            ], 400);
//        }


        // valid data
        $email  = request('email');
        $answers_text = request('answers');

        // we explode the answers based on |
        $answers_mixed_array = explode('|', $answers_text);

        // we now have the answers in an array in this format: ['2,1'] or ['3,'].
        // TODO: we're doing it this way till I get the CORS issue figured out.
        // the digit before comma is the id, the info after comma is the answer
        // answers: 1 to 5, ranging from strong agree - strongly disagreee
        // 1 = strong agree, 2 = agreee, 3 = neutral, 4 = disagree, 5 = strongly disagree
        $actual_answers = [];
        $total_score = 0;

        foreach ($answers_mixed_array as $answer_mixed)
        {
            $exploded = explode(',', $answer_mixed);
            $answer = [
                'intel_id'        =>  $exploded[0],
                'answer'    =>  $exploded[1]
            ];

            $actual_answers[] = $answer;
        }

        // we now have our answers ready
        // now we check each answer, see what intelligence it is from, and we calculate their strength in each
        $intel_profile = []; // we will use this to do everything and also return this to the front end.

        // save the test as we go on
        $token = AssessmentTest::generateUniqueToken($email);
        $at = new AssessmentTest();
        $at->token = $token;
        $at->email = $email;
        $at->name = $request->get('name');



        $intelligences = Intelligence::all();

        foreach ($intelligences as $intel)
        {
            $intel_profile[$intel->id] = [
                'title' => $intel->title,
                'score' => 0
            ];
        }

        foreach ($actual_answers as $ans)
        {
            $intel = TestQuestion::find($ans['intel_id'])->intelligence;
            $answer_score = TestQuestion::getAnswerScore($ans['answer']);
            $intel_profile[$intel->id]['score'] += $answer_score;
            $total_score += $answer_score;
        }

        // now we sort the intelligences based on their total score
        usort($intel_profile, function($a, $b)
        {
            return $b['score'] <=> $a['score'];
        });

        $at->intelligence_profile = json_encode($intel_profile);

        $entries_to_keep = 5; // TODO: later grab this from DB

        $top_five = array_splice($intel_profile, 0, $entries_to_keep);

        $total_score = 0; // we will use this to calculate weighted ratio
        // calculate the total
        foreach ($top_five as $tf)
        {
            $total_score += $tf['score'];
        }

        $at->final_score = $total_score;

        // now calculate the individual ratio
        foreach ($top_five as $key => $tf)
        {
            $top_five[$key]['ratio'] = round(( $tf['score'] / $total_score ) * 100, 2);
        }

        $at->top_five = json_encode($top_five);
        $at->save();

        return response()->json([
            'status'    =>  'success',
            'top_five'  =>  $top_five,
            'token'     =>  $token
        ], 200);
    }


    public function signupViaToken(Request $request)
    {
        $rules = [
            'token' =>  'required|exists:assessment_tests,token',
            'pass'=>'required'
        ];
        
        $request->validate($rules);
        

        $token = $request->get('token');
        $pass=$request->get('pass');

        $assessmentTest = AssessmentTest::where('token', $token)->first();


        if($assessmentTest)
        {
            $user = new User();
            $user->email = $assessmentTest->email;
            $user->name = $assessmentTest->name;
            $user->course_level_id = $assessmentTest->level;
            
            $user->password = bcrypt($pass);
            $user->active = true;
            $user->save();


            $login_token = OneTimeLoginToken::createToken($user->id)->token;


            // // send email
            try {
                Mail::to($user->email)
                ->send(new SendRegistrationInformation(array(
                    'email' => $user->email,
                    'name'  => $user->name,
                    'token' => $token,
                    'password' => $pass
                )));
            } catch (Exception $e) {
                dd($e);
            }

            // return
            return response()->json([
                'status'    =>  'successs',
                'mesage'    =>  'signup completed',
                'login_token'   =>  $login_token
            ], 200);
        }
    }

    public function checkEmail(Request $request)
    {
        $rules = [
            'email' =>  'required|email',
        ];
        $validator = Validator::make($request->all(), $rules);

        if($validator->fails())
        {
            return response()->json([
                'status'    =>  'error',
                'mesage'    =>  'invalid input detected'
            ], 400);
        }

        $exists = User::where('email', $request->get('email'))->first();

        $exists = $exists != null;

        return response()->json([
            'status'        =>  'successs',
            'duplicate'     =>  $exists
        ], 200);
    }

    public function validateToken(Request $request)
    {
        $rules = [
            'token' =>  'required|exists:one_time_login_tokens',
        ];
        $validator = Validator::make($request->all(), $rules);

        if($validator->fails())
        {
            return response()->json([
                'status'    =>  'error',
                'mesage'    =>  'invalid input detected'
            ], 400);
        }

        return response()->json([
            'status'        =>  'successs'
        ], 200);
    }

    public function  loginViaToken(Request $request)
    {
        $rules = [
            'token' =>  'required|exists:one_time_login_tokens',
        ];
        $validator = Validator::make($request->all(), $rules);

        if($validator->fails())
        {
            return response()->json([
                'status'    =>  'error',
                'mesage'    =>  'invalid input detected'
            ], 400);
        }

        $tokenEntry = OneTimeLoginToken::where('token', $request->get('token'))->first();
        $user = User::find($tokenEntry->user_id);
        Auth::loginUsingId($user->id);

        if( $request->has('name') && !is_null( $request->get('name') ) )
        {
            $user->update(['name' => $request->get('name')]);
        }


        $data['status']     =   'success';
        $data['token']      =   $user->createToken('MyApp')->accessToken;

        $user->update([
            'last_login_location' => \request()->ip(),
            'last_login_at' => now()
        ]);

        // delete the token, it has fulfilled it's destiny
        $tokenEntry->delete();

        return response()->json($data, 200);
    }



    // EOF
}
