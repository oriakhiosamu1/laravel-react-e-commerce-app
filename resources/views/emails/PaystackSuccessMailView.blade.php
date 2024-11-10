<x-mail::message>
# Introduction

Hello {{ Auth::user()->name }}, thank you for patronising us, below is your reference number:
<p><strong>{{ $reference }}</strong></p>

@component('mail::button', ['url'=> 'http://localhost:5173'])
    Visit Our Page
@endcomponent

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
