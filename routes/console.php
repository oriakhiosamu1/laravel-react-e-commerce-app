<?php

use App\Mail\NewProductEmail;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Schedule;

// Artisan::command('inspire', function () {
//     $this->comment(Inspiring::quote());
// })->purpose('Display an inspiring quote')->hourly();

// LARAVEL SCHEDULER (IT WORKED)
// Schedule::call(function(){
//     $user = DB::table('users')->where('id', 1)->get();
//     dd($user);
// })->everyMinute();




// SCHEDULER THAT SENDS USERS IN DATABASE EMAIL OF NEW ARRIVAL EVERY 5 - MINUTES
Schedule::call(function(){
    $users = User::all(); #gets all registered users
    $productsCount = Product::count(); #gets the count of all products available
    $products = Product::skip($productsCount-5)->take(5)->get(); #skips result of count - 5 and gets latest 5 products

    // loops through all users and sends mail of new product arrival to individual users
    foreach($users as $user){
        Mail::to($user->email)->send(new NewProductEmail($products));
    }
})->everyFiveMinutes();
