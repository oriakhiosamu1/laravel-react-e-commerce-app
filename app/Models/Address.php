<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'address',
        'country',
        'phone',
        'user_id'
    ];

    // RELATIONSHIP WITH USER
    public function user(){
        return $this->belongsTo(User::class);
    }
}
