<?php

use App\Http\Controllers\SampleController;
use Illuminate\Support\Facades\Route;

require __DIR__ . '/auth.php';

Route::middleware(['localOnly'])->group(function () {
    Route::get('/token', function () {
        return csrf_token();
    });

    Route::get('test', [SampleController::class, 'test']);
});

// authenticated route
Route::middleware(['auth'])->group(function () {
    Route::get('/users/authenticated', function () {
        return auth()->user();
    });
});

Route::get('/{any?}', function () {
    $test = "test from back end initial load";

    return view('app', [
        'test' => $test
    ]);
});