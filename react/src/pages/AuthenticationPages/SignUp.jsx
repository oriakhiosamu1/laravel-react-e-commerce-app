// import React from 'react'
import './SignUp.css';
import { useState } from 'react';
import { useStateContext } from '../../context/ContextProvider';
import AxiosClient from '../../Axios/Axios';
import FormError from '../../error/FormError';
// import Axios from '../../Axios/Axios';

const SignUp = () => {

    // TOKEN VARIABLE
    const {setUser, setToken} = useStateContext();
    // const {setUser, setToken} = useStateContext();

    // ERROR VARIABLE
    const [errors, setErrors] = useState([]);

    // REGISTER USER VARIABLE
    const [newUser, setNewUser] = useState({
        name:'',
        email: '',
        password: '',
        password_confirmation:''
    })

    // LOADING VARIABLE
    const [isLoading, setIsLoading] = useState(false);

    // FUNCTION THAT HANDLES ONCHANCE
    function handleChange(e){
        const {name,value} = e.target;
        setNewUser((prev)=>{
            return {...prev, [name]:value}
        })
    }

    // HANDLES SUBMIT FUNCTION
    function handleSubmit(e){
        e.preventDefault();
        setIsLoading(true);

        AxiosClient.post('/sign-up', newUser)
        .then(({data})=>{
            setIsLoading(false);
            setToken(data.token);
            setUser(data.user);
        })
        .catch((error)=>{
            console.log(error);
            setIsLoading(false);

            const response = error.response;
            if(response.status=== 422){
                setErrors(response.data.errors);
            }
        })
    }

  return (
    <section className="container">
      <header>Registration Form</header>
      <form onSubmit={handleSubmit} className="form">
        <div className="input-box">
          <label>Full Name</label>
          <input type="text" name='name' value={newUser.name} onChange={handleChange} placeholder="Enter full name" required />
        </div>

        <div className="input-box">
          <label>Email Address</label>
          <input type="email" name='email' value={newUser.email} onChange={handleChange} placeholder="Enter email address" required />
        </div>

        <div className="column">
          <div className="input-box">
            <label>Password</label>
            <input type="password" name='password' value={newUser.password} onChange={handleChange} placeholder="Enter password" required />
          </div>

          <div className="input-box">
            <label>Password Confirmation</label>
            <input type="password" name='password_confirmation' value={newUser.password_confirmation} onChange={handleChange} placeholder="Password confirmation" required />
          </div>
        </div>

        <FormError errors={errors} />

        <button>{isLoading ? 'Creating User...' : 'Submit'}</button>
      </form>
    </section>
  )
}

export default SignUp
