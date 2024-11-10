<x-mail::message>
Good day friend!

Hello highly esteemed client, this is to inform you of the arrival of our latest gadget added to our store

<ul>
    @foreach ($products as $product)
        <li>{{ $product->name }}</li>
    @endforeach
</ul>

To see more about these products, ensure to visit our website now

@component('mail:button', ['url'=> 'http://localhost:5173'])
    Visit Our Website
@endcomponent

{{-- <x-mail::button :url="''">
Button Text
</x-mail::button> --}}

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
