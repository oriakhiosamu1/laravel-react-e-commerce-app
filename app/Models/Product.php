<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'category',
        'price',
        'picture',
        'inStock',
        'description'
    ];

    // RELATIONSHIP WITH CARTS TABLE
    public function cart(){
        return $this->belongsTo(Cart::class);
    }

    // RELATIONSHIP WITH BUY TABLE
    public function history(){
        return $this->belongsTo(Buy::class);
    }
}
