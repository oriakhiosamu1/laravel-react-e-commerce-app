<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Product::class;

    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'category' => fake()->text(50),
            'price' => rand(10, 10000),
            'picture'=>fake()->image(storage_path("app/products"), 500, 500, null, false),
            'inStock' => fake()->boolean(),
            'description' => fake()->text(500),
            'created_at' => now(),
            'updated_at' => now()
        ];
    }
}
