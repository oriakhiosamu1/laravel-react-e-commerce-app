<?php

namespace App\Http\Controllers\React;

use App\Http\Controllers\Controller;
use App\Http\Resources\AddressResource;
use App\Jobs\SuccessMailJob;
use App\Mail\PaystackSuccessMail;
use App\Models\Address;
use App\Models\Buy;
use App\Models\Cart;
use App\Models\History;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class AddressController extends Controller
{
    // 1. CREATES A NEW CHECKOUT ADDRESS
    public function store(Request $request){
        // validation rules
        $address = $request->validate([
            'name'=> 'required',
            'email' => 'email:filter|required',
            'address' => 'required',
            'country' => 'required',
            'phone' => 'required'
        ]);

        $address['user_id'] = auth()->id();


        // CHECKS DATABASE IF USER HAVE ALREADY CREATED CHECKOUT ADDRESS
        $check = Address::where('user_id', auth()->id())->first();
        if($check){
            $check->update([
                'name'=> $request->name,
                'email' => $request->email,
                'address' => $request->address,
                'country' => $request->country,
                'phone' => $request->phone,
            ]);
            return response('ADDRESS HAS BEEN UPDATED SUCCESSFULLY');
        }
        // CHECKS DATABASE IF USER HAVE ALREADY CREATED CHECKOUT ADDRESS


        Address::create($address);
        return response('ADDRESS CREATED');
    }

    // 2. FUNCTION CHECKS IF A USER ALREADY HAVE AN ACCOUNT AND RETURNS THE ADDRESS
    public function checks(){
        $check = Address::where('user_id', auth()->id())->first();

        if($check){
            // return response($check);
            return response(new AddressResource($check));
        }

        return response('USER DOES NOT HAVE AN EXISTING ACCOUNT');
    }

    // 3. SENDS EMAIL ON PAYSTACK SUCCESS
    public function email(Request $request){
        $reference = $request->reference;

        // method-01: sending mail without queues
        Mail::to(Auth::user()->email)->send(new PaystackSuccessMail($reference));

        // // method-02: sending mail using the delay function
        // $when = now()->addMinutes(3);
        // Mail::to(Auth::user()->email)->later($when, new PaystackSuccessMail($reference));

        // // method-03: sending mail using queues
        // Mail::to(Auth::user()->email)->queue(new PaystackSuccessMail($reference));

        // // method-04: sending mail using job dispatching
        // SuccessMailJob::dispatch($reference);

        // TRANSFERS ALL CART DATA INTO THE HISTORY TABLE
        // $cart = Cart::where('user_id', auth()->id())->get();

        // foreach($cart as $history){
        //     Buy::create([
        //         'user_id' => $history->user_id,
        //         'product_id' => $history->product_id,
        //         'name' => $history->name,
        //         'picture' => $history->picture,
        //         'price' => $history->price,
        //         'quantity' => $history->quantity,
        //         'reference' => $reference,
        //     ]);
        // }

        // // AFTER TRANSFERING CART DATA TO HISTORY TABLE, IT DELETES ALL OF THAT USER'S CART DATA
        // foreach($cart as $del){
        //     $del->delete();
        // }

        return response('HISTORY DATA CREATED', 201);
    }
}
