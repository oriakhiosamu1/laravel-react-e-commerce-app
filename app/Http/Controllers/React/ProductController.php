<?php

namespace App\Http\Controllers\React;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    //FETCHES PRODUCT CATEGORY
    public function fetchProducts(){
        $category = Product::all();
        return response()->json($category);
    }

    // FETCHES A SINGLE PRODUCT
    public function show(Product $product){
        return response()->json($product);
    }
}
