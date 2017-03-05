<?php

use Illuminate\Http\Request;

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

Route::get('/begin', function (Request $request) {
    // broadcast an event
    event(new App\Events\BeginSlides(
      $request->get('url'),
      $request->get('name')
    ));

    return json_encode(true);
});

Route::get('/react', function (Request $request) {
    // broadcast an event
    event(new App\Events\Interact(
      $request->get('intensity'),
      $request->get('emoji')
    ));

    return json_encode(true);
});

Route::get('/ask', function (Request $request) {
    // broadcast an event
    event(new App\Events\Question(
      $request->get('question'),
      $request->get('name')
    ));

    return json_encode(true);
});
