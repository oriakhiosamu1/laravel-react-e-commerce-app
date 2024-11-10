<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function create(){
        return view('addProduct');
    }

    public function store(Request $request){
        $product = $request->validate([
            'name' => 'required',
            'category' => 'required',
            'price' => 'required',
            'inStock' => 'required',
            'description' => 'required',
            'picture' => 'required|mimes:jpg,jpeg,png'
        ]);

        if($request->hasFile('picture')){
            $product['picture'] = $request->file('picture')->store('products', 'public');
        }

        if($request->inStock === "true"){
            $product['inStock'] = true;
        }else{
            $product['inStock'] = false;
        }

        Product::create($product);

        return back();
    }

    public function edit(Request $request, Product $product){
        $formField = $request->validate([
            'name' => 'required',
            'category' => 'required',
            'price' => 'required',
            'inStock' => 'required',
            'description' => 'required',
            'picture' => 'nullable|mimes:jpg,jpeg,png'
        ]);

        dd($formField);

        $product->update($formField);

        return back();
    }

    public function show(Product $product){
        return view('showProduct', [
            'product' => $product,
        ]);
    }

    public function delete(Product $product){
        $product->delete();
        return back();
    }
}
