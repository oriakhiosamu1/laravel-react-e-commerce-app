<?php

namespace App\Http\Controllers;

use App\Http\Requests\SignInRequest;
use App\Http\Requests\SignUpRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function login(SignInRequest $request)
    {
        //HANDLES THE LOGIN REQUEST
        $credentials = $request->validated();

        if(!Auth::attempt($credentials)){
            return response([
                'message' => 'Invalid Credentials'
            ], 422);
        }

        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function register(SignUpRequest $request)
    {
        //HANDLES THE REGISTER REQUEST
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    // HANDLES LOGOUT METHOD
    public function logout(Request $request){
        $user = $request->user();

        /** @var User $user */
        $user->currentAccessToken()->delete();
        return response('', 204);
    }
}
