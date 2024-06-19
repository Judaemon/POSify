<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class SampleController extends Controller
{
    // index
    public function index()
    {
        return "testing";
    }

    public function test()
    {
        $users = User::all();
        return $users->toJson();
    }

    public function test123()
    {
        // DB::statement('DROP TABLE users');
        // $test = DB::select("SELECT * FROM sessions");

        // return $test;

        // throw 419
        abort(419, 'CSRF token mismatch');
    }
}