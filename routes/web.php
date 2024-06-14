<?php

use App\Http\Controllers\Auth\SampleController;
use Illuminate\Support\Facades\Route;

require __DIR__ . '/auth.php';

Route::middleware(['localOnly'])->group(function () {
    Route::get('/token', function () {
        return csrf_token();
    });

    Route::get('test', [SampleController::class, 'test']);
});


Route::get('/{any?}', function () {
    return view('app');
});