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
    })->name('authenticated-user');
});

Route::get('/{any?}', function () {
    $isAuthenticated = auth()->check();
    // $isAuthenticated = true;

    return view('app', [
        'isAuthenticated' => $isAuthenticated,
    ]);
})->name('app');