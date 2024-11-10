<?php

namespace App\Jobs;

use App\Mail\PaystackSuccessMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class SuccessMailJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */

    public $reference;

    public function __construct($reference)
    {
        //
        $this->reference = $reference;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Mail::to(Auth::user()->email)->send(new PaystackSuccessMail($this->reference));
    }
}
