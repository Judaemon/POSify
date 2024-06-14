<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;

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
}