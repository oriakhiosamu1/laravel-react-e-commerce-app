<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthenticationController extends Controller
{
    public function login(Request $request){
        $credentials = $request->validate([
            'email' => 'required|email:filter|exists:users,email',
            'password' => 'required|max:30|min:8'
        ]);

        if(Auth()->attempt($credentials)){
            $request->session()->regenerate();
            return redirect()->intended('/admin/add-product');
            // dd('LOGIN SUCCESSFUL');
        }

        return back()->with('message', 'Failed to login');
    }

    public function logout(Request $request){
        Auth()->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
