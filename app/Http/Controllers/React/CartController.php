<?php

namespace App\Http\Controllers\React;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    //ADDS DATA TO CART
    public function store(Product $product, $quantity){

        $cart = Cart::create([
            'user_id' => auth()->id(),
            'product_id' => $product->id,
            'name' => $product->name,
            'price' => $product->price,
            'quantity' => $quantity,
            'picture' => $product->picture,
        ]);

        return response()->json($cart);
    }

    // FETCHES PARTICULAR USER'S CART DATA
    public function show(){
        $user = Auth::user();

        $cart = $user->cart()->get();
        return response($cart);
    }

    // REMOVES DATA FROM CART
    public function remove(Cart $cart){
        $cart->delete();

        return response('DATA DELETED');
    }

    // SUMS UP CART PRICES
    public function sum(){
        $user = Auth::user();
        $cart = $user->cart()->sum('price');
        return response($cart);
    }
}
