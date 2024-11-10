import { Link } from 'react-router-dom';
import './SignUp.css';
import { useState } from 'react';
import { useStateContext } from '../../context/ContextProvider';
import AxiosClient from '../../Axios/Axios';
import FormError from '../../error/FormError';

const SignIn = () => {

    const {setUser, setToken} = useStateContext();
    const [display, setDisplay] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [newUser, setNewUser] = useState({
        email: '',
        password: '',
    })



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
        setIsLoading(true)

        AxiosClient.post('/login', newUser)
        .then(({data})=>{
            setIsLoading(false);
            setToken(data.token);
            setUser(data.user);
        })
        .catch((error)=>{
            setIsLoading(false);
            console.log(error);

            const response = error.response;
            if(response.status=== 422){
                setErrors(response.data.errors);
            }

            if(response.status===422){
                setErrors(response.data.message)
            }

        })
    }

    function handleDisplay(){
        setDisplay((prev)=>{
            return !prev
        })
    }

  return (
    <section className="container">
      <header>Login Form</header>
      <form onSubmit={handleSubmit} className="form">

        <div className="input-box">
          <label>Email Address</label>
          <input type="email" name='email' value={newUser.email} onChange={handleChange} placeholder="Enter email address"  />
        </div>

        <div className="column">
          <div className="input-box">
            <label>Password</label>
            <div className='hide-show-div'>
                <input type={display ? "text" : "password"} name='password' value={newUser.password} onChange={handleChange} placeholder="Enter password"  />
                <button className='hide-show' type='button' onClick={handleDisplay}>{display ? "Hide" : "Show"}</button>
            </div>
          </div>
        </div>

        <FormError errors={errors} />

        <button>{isLoading ? 'Logging In...' : 'Submit'}</button>
        <div style={{ textAlign:'center' }}>
            <small><Link style={{ color:'#252525' }} to='#'>Forget Password?</Link></small>
        </div>
      </form>
    </section>
  )
}

export default SignIn
