<?php

use App\Http\Controllers\Admin\AuthenticationController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\React\ProductController as ReactProductController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::post('/admin/login', [AuthenticationController::class, 'login'])->name('login');
Route::get('/admin/logout', [AuthenticationController::class, 'login'])->name('logout');
Route::get('/admin/add-product', [ProductController::class, 'create'])->name('create');

Route::post('/admin/store-product', [ProductController::class, 'store'])->name('store');
