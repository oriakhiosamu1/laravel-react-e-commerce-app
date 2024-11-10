<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Buy extends Model
{
    use HasFactory;


    protected $fillable = [
        'user_id',
        'product_id',
        'name',
        'picture',
        'price',
        'quantity',
        'reference',
        'status'
    ];

    // RELATIONSHIP WITH USER
    public function user(){
        return $this->belongsTo(User::class);
    }

    // RELATIONSHIP WITH PRODUCT
    public function product(){
        return $this->hasOne(Product::class);
    }
}
