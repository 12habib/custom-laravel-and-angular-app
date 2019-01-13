<?php

use Illuminate\Http\Request;
use App\User;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/**
 * NOTE: forgive the mess
 */

/////////////////////////
// Learners's Section //
///////////////////////
Route::group(['prefix' => 'v1'], function()
{
    Route::get('questionnaire',     'PreRegistration@sendQuestionnaire');
    Route::get('getProfile',        'PreRegistration@getProfile');
    Route::post('signupViaToken',    'PreRegistration@signupViaToken');
    Route::get('checkEmail',        'PreRegistration@checkEmail');
    Route::get('setLevel',        'PreRegistration@setLevel');
//    Route::post('token.validate',   'PreRegistration@validateToken');
    Route::post('token.validate',   'PreRegistration@loginViaToken');
    Route::post('login.viaToken',   'PreRegistration@loginViaToken'); // login someone using a one time login token
    Route::post('login',            'API\AuthController@login');
   
    
    Route::get('user', function ()
    {
        return User::currentUser();
    });
    Route::post('user',             'LearnController@updateUser');
    Route::get('user.intel',        'Users@getIntelligenceProfile');
    Route::get('levels.get',        'CourseLevels@index');
    Route::post('levels.change',        'LearnController@changeLevel');

    // parts
    // for demo. Don't use in production
    Route::get('lessons.getLessonsForDemo',         'LearnController@getLessonsForDemo');
    Route::post('lessons.getPartsForDemo',           'LearnController@getPartsByLessonForDemo');

    // 
    Route::get('modules.getList',   'LearnController@get_all_modules');
    Route::post('modules.purchase', 'Payments@store');
    Route::post('resize_photos', 'LearnController@resize_photos');
    
    // Save Progress
    Route::post('progress.save', 'LearnController@saveProgess');

});


////////////////////////////
// ADMINISTRATION SECTION //
////////////////////////////
Route::post('login', ['as' => 'user.login', 'uses' => 'API\AuthController@login']);
Route::post('register', ['as' => 'user.register', 'uses' => 'API\AuthController@register']);
Route::post('activate', ['as' => 'user.activate', 'uses' => 'API\AuthController@activate']);

// password reset for all
Route::post('user.forgotPassword',        'API\AuthController@forgotPassword');
Route::post('user.doResetPw',        'API\AuthController@doResetPw');

Route::middleware('auth:api')->get('/user', function (Request $request)
{
    return $request->user();
});
Route::group(['middleware' => 'auth:api'], function()
{

    // Users
    Route::group(['prefix' => 'users'], function(){
        // We are not using a resource route for we will be using some custom routes too
        Route::post('', ['as' => 'user.index', 'uses' => 'Users@index']);
        Route::get('view/{id}', ['as' => 'user.view', 'uses' => 'Users@show']);
        Route::post('update/{id}', ['as' => 'user.update', 'uses' => 'Users@update']);
        Route::post('delete/{id}', ['as' => 'user.destroy', 'uses' => 'Users@destroy']);
        Route::post('store', ['as' => 'user.store', 'uses' => 'Users@store']);
    });

    Route::resource('intelligences', 'Intelligences');

    // Course Levels
    Route::resource('course-levels', 'CourseLevels');
    Route::post('course-levels/saveOrder', ['as' => 'courseLevels.saveOrder', 'uses' => 'CourseLevels@saveOrder']);

    // Courses
    Route::resource('courses', 'Courses');
    Route::put('courses/updateCoverPhoto/{id}', 'Courses@updateCOverPhoto');
    Route::post('courses/removeCoverPhoto/{id}', 'Courses@removeCoverPhoto');

    // Modules
    Route::resource('modules', 'CourseModules');

    // Lessons
    Route::resource('lessons', 'Lessons');

    // part Data
    Route::get('get_part/{id}', 'PartController@show');
    Route::post('save_part', 'PartController@store');
    Route::post('get_parts_by_lesson/{lesson_id}', 'PartController@getPartsByLesson');
    Route::post('delete_part',  'PartController@destroy');
    Route::post('duplicate_content',  'PartController@duplicate_content');

    // Payments
    Route::group(['prefix' => 'payments'], function() {
        Route::post('', 'Payments@index');
    });

    //  Assessment Test  //
    //      Questions
    Route::resource('test-questions', 'TestQuestions');

    // Exercises
    Route::resource('exercises', 'Exercises');
    Route::get('get_exercises/{lesson_id}', 'Exercises@get_by_lesson_id');
    Route::group(['prefix' => 'exercises'], function()
    {
        Route::post('/update_status',   'Exercises@update_status');
        Route::post('/update_title',    'Exercises@update_title');
        Route::post('/update_sorting',  'Lessons@update_exercise_sorting');

    });
    
    // Languages
    Route::resource('languages','Languages');

    //      CRUD

});

