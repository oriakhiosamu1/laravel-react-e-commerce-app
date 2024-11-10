<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\React\AddressController;
use App\Http\Controllers\React\CartController;
use App\Http\Controllers\React\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/sign-up', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');


Route::middleware('auth:sanctum')->group(function(){
    Route::get('/products', [ProductController::class, 'fetchProducts'])->name('fetchProducts'); #FETCHES ALL PRODUCT FROM REACT FRONTEND
    Route::get('/product/{product}', [ProductController::class, 'show'])->name('fetchProduct'); #FETCHES A SINGLE PRODUCT


    Route::post('/add_to_cart/{product}/{quantity}', [CartController::class, 'store'])->name('addToCart'); #ADDS TO CART
    Route::get('/cart', [CartController::class, 'show'])->name('show.cart'); #SHOWS CART DATA OF LOGGED IN USER
    Route::delete('/remove/{cart}', [CartController::class, 'remove'])->name('remove.cart'); #REMOVES DATA FROM CART
    Route::get('/sum', [CartController::class, 'sum'])->name('sum.cart'); #SUMS DATA FROM CART


    Route::post('/create_address', [AddressController::class, 'store']); #CREATES CHECKOUT ADDRESS
    Route::get('/checks_for_address', [AddressController::class, 'checks']); #CHECKS IF USER ALREADY HAVE ACCOUNT
    Route::post('/paystack_email', [AddressController::class, 'email']); #SENDS EMAIL ON PAYSTACK SUCCESS
});
