<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin sign in Page</title>
    <link rel="stylesheet" href="{{ asset('css/register.css') }}">
</head>
<body>
    <div id="container" class="container">
        <!-- FORM SECTION -->
        <div class="row">
            <!-- SIGN UP -->
            <div class="col align-items-center flex-col sign-up">

                <form action="{{ route('login') }}" method="post">
                    @csrf
                    <div class="form-wrapper align-items-center">
                        <div class="form sign-up">

                            <div class="input-group">
                                <i class='bx bx-mail-send'></i>
                                <input name="email" type="email" placeholder="Email">
                                @error('email')
                                    <small class="text-danger">{{ $message }}</small>
                                @enderror
                            </div>

                            <div class="input-group">
                                <i class='bx bxs-lock-alt'></i>
                                <input name="password" type="password" placeholder="Password">
                                @error('password')
                                    <small class="text-danger">{{ $message }}</small>
                                @enderror
                            </div>

                            <button type="submit">
                                Login as Admin
                            </button>

                            <p>
                                <span>
                                    Already have an account?
                                </span>
                                <b onclick="toggle()" class="pointer">
                                    Sign in here
                                </b>
                            </p>
                        </div>
                    </div>
                </form>

            </div>
            <!-- END SIGN UP -->
            <!-- SIGN IN -->
            <div class="col align-items-center flex-col sign-in">
                <div class="form-wrapper align-items-center">

                    <form action="{{ route('login') }}" method="post">
                        @csrf

                        <div class="form sign-in">
                            <div class="input-group">
                                <i class='bx bx-mail-send'></i>
                                <input name="email" type="email" placeholder="Email">
                                @error('email')
                                    <small class="text-danger">{{ $message }}</small>
                                @enderror
                            </div>

                            <div class="input-group">
                                <i class='bx bxs-lock-alt'></i>
                                <input name="password" type="password" placeholder="Password">
                                @error('password')
                                    <small class="text-danger">{{ $message }}</small>
                                @enderror
                            </div>
                            <button type="submit">
                                Login as Admin
                            </button>
                            <p>
                                <b>
                                    Forgot password?
                                </b>
                            </p>
                            <p>
                                <span>
                                    Don't have an account?
                                </span>
                                <b onclick="toggle()" class="pointer">
                                    Sign up here
                                </b>
                            </p>
                        </div>
                    </form>
                </div>
                <div class="form-wrapper">

                </div>
            </div>
            <!-- END SIGN IN -->
        </div>
        <!-- END FORM SECTION -->
        <!-- CONTENT SECTION -->
        <div class="row content-row">
            <!-- SIGN IN CONTENT -->
            <div class="col align-items-center flex-col">
                <div class="text sign-in">
                    <h2>
                        Welcome
                    </h2>

                </div>
                <div class="img sign-in">

                </div>
            </div>
            <!-- END SIGN IN CONTENT -->
            <!-- SIGN UP CONTENT -->
            <div class="col align-items-center flex-col">
                <div class="img sign-up">

                </div>
                <div class="text sign-up">
                    <h2>
                        Join with us
                    </h2>

                </div>
            </div>
            <!-- END SIGN UP CONTENT -->
        </div>
        <!-- END CONTENT SECTION -->
    </div>

    <script src="{{ asset('js/register.js') }}"></script>
</body>
</html>
