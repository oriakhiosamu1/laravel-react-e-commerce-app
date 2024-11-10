// import React from 'react'
import { useEffect, useState } from 'react'
import './checkout.css'
import AxiosClient from '../../Axios/Axios';
import FormError from '../../error/FormError';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const [sum, setSum] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [address, setAddress] = useState([]);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    // 1. FETCHES CART SUM DATA FOR LOGGED IN USER
    useEffect(()=>{
        AxiosClient.get('/sum')
        .then((res)=>{
            // console.log(res);
            setIsLoading(false);
            setSum(res.data);

            // sets cart sum into localstorage
            localStorage.setItem('SUM', sum);
        })
        .catch((error)=>{
            console.log(error);
            setIsLoading(false);

            const response = error.response;
            if(response.status=== 422){
                setErrors(response.data.error);
            }
        })
    }, [sum]);

    // 2. FETCHES USER ADDRESS DATA
    useEffect(()=>{
        AxiosClient.get('/checks_for_address')
        .then((res)=>{
            setAddress(res.data)

            // sets address into localstorage
            localStorage.setItem('ADDRESS', JSON.stringify(address))
        })
        .catch((err)=>{
            console.log(err);
        })
    }, [address]);

    // 3. HANDLES ONCHANGE FUNCTION
    function handleChange(e){
        const name = e.target.name;
        const value = e.target.value;

        setAddress((prev)=>{
            return {...prev, [name]:value}
        })
    }

    // 4. HANDLES SUBMIT FUNCTION
    function handleSubmit(e){
        e.preventDefault();

        console.log(address);
        AxiosClient.post('/create_address', address)
        .then((res)=>{
            console.log(res)

            // sets address into localstorage
            localStorage.setItem('ADDRESS', JSON.stringify(address))
            navigate('/index/paystack');
        })
        .catch((error)=>{
            console.log(error);

            const response = error.response;
            if(response.status=== 422){
                setErrors(response.data.errors);
            }
        })
    }


  return (
    <div className="py-3 py-md-4 checkout">
        <div className="container">
            <h4>Checkout</h4>
            <hr></hr>

            <div className="row">
                <div className="col-md-12 mb-4">
                    <div className="shadow bg-white p-3">
                        <h4 className="text-primary">
                            Item Total Amount :
                            <span className="float-end">${isLoading ? '0' : sum}</span>
                        </h4>
                        <hr></hr>
                        <small>* Items will be delivered in 3 - 5 days.</small>
                        <br/>
                        <small>* Tax and other charges are included ?</small>
                        <br/>
                        <small>* Update existing address and click proceed to checkout</small>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="shadow bg-white p-3">
                        <h4 className="text-primary">
                            Basic Information
                        </h4>
                        <hr></hr>

                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Full Name</label>
                                    <input type="text" name="name" onChange={handleChange} value={address.name} className="form-control" placeholder="Enter Full Name" />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Phone Number</label>
                                    <input type="text" name="phone" onChange={handleChange} value={address.phone} className="form-control" placeholder="Enter Phone Number" />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Email Address</label>
                                    <input type="email" name="email" onChange={handleChange} value={address.email} className="form-control" placeholder="Enter Email Address" />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Country</label>
                                    <input type="text" name="country" onChange={handleChange} value={address.country} className="form-control" placeholder="Enter Country" />
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label>Full Address</label>
                                    <textarea name="address" onChange={handleChange} value={address.address} className="form-control" rows="2"></textarea>
                                </div>

                                <FormError errors={errors} />

                                <div className="col-md-12 mb-3">
                                    <div className="d-md-flex align-items-start">
                                        <div className="nav col-md-3 flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                            <button type="submit" onClick={handleSubmit} className=" btn btn-primary nav-link fw-bold" id="onlinePayment-tab" data-bs-toggle="pill" data-bs-target="#onlinePayment" role="tab" aria-controls="onlinePayment" aria-selected="false">Proceed To Checkout</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </form>

                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Checkout
