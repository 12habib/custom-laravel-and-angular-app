<?php
/**
 * This controller is used to manage some non-class specific
 */
namespace App\Http\Controllers;

use App\AssessmentTest;
use App\CourseModule;
use App\Lesson;
use App\LessonProfile;
use App\PartData;
use App\Payment;
use Illuminate\Http\Request;
use Validator;
use App\User;
use App\UserProgress;

class LearnController extends Controller
{
    public function updateUser(Request $request)
    {
        $rules = [ 'id' => 'required', 'name'  =>  'required' ];

        if($request->has('password'))
        {
            $rules['password'] = 'required|min:8';
            $rules['password_confirmation'] = 'required|same:password';
        }

        $v = Validator::make($request->all(), $rules);

        if($v->fails())
        {
            return response()->json(['status' => 'error', 'message' => 'Invalid input'], 400);
        }

        $user = User::find($request->get('id'));

        if($user)
        {
            $user->name = $request->get('name');
            $user->profile_picture = $request->get('profile_picture');
            if($request->has('password'))
            {
                $user->password = bcrypt($request->get('password'));
            }

            $user->save();
            return response()->json(['status' => 'success', 'message' => 'Profile Updated'], 200);
        }
        else
        {
            return response()->json(['status' => 'error', 'message' => 'Invalid input'], 400);
        }

    }

    public function  getLessonsForDemo()
    {
        $lessons = Lesson::all();
        $modules = CourseModule::all();
        return response()->json([
            'modules'   =>  $modules,
            'lessons'   =>  $lessons
        ]);
    }


    public function getPartsByLessonForDemo(Request $request)
    {

        // todo: for the demo, we're showing all parts. but for the production, we will only show parts based on the intelligence.
        $rules = [
            'lesson_id' => 'required|integer|exists:lessons,id'
        ];

        $v = Validator::make($request->all(), $rules);

        if( $v->fails() )
        {
            return response()->json([
                'status'    =>  'error',
                'message'   =>  'validation error',
                'errors'    =>  $v->errors()
            ]);
        }

        $lesson_id = $request->get('lesson_id');
        $user_id = User::currentUser()->id;
        
        
        $exercises = \App\Exercise::where('lesson_id', $lesson_id)->get();

        // $progress = UserProgress::getProgress($user_id, $lesson_id);
        
        $parts = [];
        
        // if(! $progress )
        // {
            foreach ($exercises as $ex)
            {
                foreach ($ex->parts as $part)
                {
                    $part->screens = $part->screens == '' ? [] : $part->screens;

                    array_push($parts, $part);
                }
            }
        // }
        // else 
        // {
        //     $parts = json_decode($progress->data);
        // }
        
        

        return response()->json([
            'parts' => $parts
        ]);
    }


    public function get_all_modules()
    {
        $course_modules = CourseModule::all();
        $course_modules->each(function($m, $i) {
            $m->course = $m->course;
            $m->purchased = Payment::where('module_id', $m->id)->first();
        });

        return response()->json([
            'modules'   =>  $course_modules
        ], 200);
    }
    
    public function resize_photos(Request $request) 
    {
        $rules = ['images'  =>  'required'];
        
        $request->validate($rules);
        
        $images = $request->get('images');
        $returnData = [];
        
        foreach ($images as $imgData)
        {
            $img = \Image::make($imgData['blob']);
            $img->resize(1024, null, function($constraints){
                $constraints->aspectRatio();
                $constraints->upsize();
            });
            $returnData[] = $img->encode('data-url');
        }
        
        return response()->json(['data' => $returnData], 200);
    }
    
    public function changeLevel(Request $request)
    {
        $rules = [
            'level_id' => 'required|integer|exists:course_levels,id'
        ];

        $v = Validator::make($request->all(), $rules);

        if( $v->fails() )
        {
            return response()->json([
                'status'    =>  'error',
                'message'   =>  'validation error',
                'errors'    =>  $v->errors()
            ]);
        }

        $level_id = $request->get('level_id');
        $user = $request->has('user_id') ? User::find($request->get('user_id')) : User::currentUserrepeat();
        $user->course_level_id = $level_id;
        $user->save();
        
        return response()->json(['message' => 'Level changed'], 200);
        
    }
    
    public function saveProgess(Request $request)
    {
        $rules = [
            'lesson_id' =>  'required|integer|exists:lessons,id',
            'data' => 'required'
        ];

        $request->validate($rules);

        $user = $request->has('user_id') ? User::find($request->get('user_id')) : User::currentUser();
        $lesson_id = $request->get('lesson_id');
        
        // first see if a progress id already exists
        // we find that by using the lesson id
        // any progress the user makes on this lesson, now or later, overwrites the old one
        
        $progress = UserProgress::where('lesson_id', $lesson_id)->first() ? 
                UserProgress::where('lesson_id', $lesson_id)->first() 
                : new UserProgress();
        
        $progress->lesson_id = $lesson_id;
        $progress->data = json_encode($request->get('data'));
        $progress->user_id = $user->id;
        $progress->save();
        
        
        return response()->json(['message' => 'Progress stored'], 200);
        
    }

    //EOF

}
