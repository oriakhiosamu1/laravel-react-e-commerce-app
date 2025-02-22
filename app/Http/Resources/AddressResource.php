<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AddressResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
          'address' => $this->address,
          'country' => $this->country,
          'email' => $this->email,
          'name' => $this->name,
          'phone' => $this->phone,
        ];
    }
}
