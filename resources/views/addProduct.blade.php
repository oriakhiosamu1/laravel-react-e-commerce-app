<!DOCTYPE html>
<!---Coding By CodingLab | www.codinglabweb.com--->
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Registration Form in HTML CSS</title>
    <!---Custom CSS File--->
    <link rel="stylesheet" href="{{ asset('css/style.css') }}" />

    {{-- BOOTSTRAP CSS --}}
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

  </head>
  <body>

    {{-- @include('nav') --}}

    <section class="container">
      <header>Add Product Form</header>
      <form action="{{ route('store') }}" method="POST" enctype="multipart/form-data" class="form">
        @csrf

        <div class="input-box">
          <label>Product Name</label>
          <input type="text" name="name" placeholder="Enter Product name" value="{{ old('name') }}" required />
          @error('name')
              <small>{{ $message }}</small>
          @enderror
        </div>


        <div class="input-box">
          <label>Product category</label>
          <input type="text" name="category" placeholder="Enter Product category" value="{{ old('category') }}" required />
            @error('category')
                <small>{{ $message }}</small>
            @enderror
        </div>

        <div class="input-box">
            <label>Product price</label>
            <input type="text" name="price" placeholder="Enter Product price" value="{{ old('price') }}" required />
            @error('price')
                <small>{{ $message }}</small>
            @enderror
        </div>


        <div class="column">

          <div class="input-box">
            <label>Product picture</label>
            <input type="file" name="picture" required />
            @error('picture')
                <small>{{ $message }}</small>
            @enderror
          </div>

          <div class="input-box">
            <label>In stock?</label>
            <input type="text" name="inStock" value="{{ old('inStock') }}" placeholder="In stock?" required />
            @error('inStock')
                <small>{{ $message }}</small>
            @enderror
          </div>

        </div>

        <div class="input-box">
            <label>Product Description</label>
            <textarea name="description" rows="5">{{ old('description') }}"</textarea>
            @error('description')
                <small>{{ $message }}</small>
            @enderror
        </div>

        <button type="submit">Add Product</button>
      </form>
    </section>

    {{-- BOOTSTRAP JS/POPPER --}}
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

  </body>
</html>
