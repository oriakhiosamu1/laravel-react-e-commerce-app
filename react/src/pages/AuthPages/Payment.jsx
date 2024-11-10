// import React from 'react'

import { useEffect, useState } from "react"
import { PaystackButton } from 'react-paystack';
import AxiosClient from '../../Axios/Axios';
import {useNavigate} from 'react-router-dom';

const Payment = () => {
    // 1. VARIABLES
    const navigate = useNavigate();
    const [sum, setSum] = useState('');
    const [form, setForm] = useState({
        email:'',
        name: '',
        amount: '',
        phoneNumber:''
    });

    // const publicKey = "pk_test_b695c08766719774bb0589229cc5eb6d0b3e2373";
    const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
    const componentProps = {
        email:form.email,
        amount:form.amount,
        metadata:{
            name:form.name,
            phoneNumber: form.phoneNumber,
        },
        publicKey,
        text:'PAY NOW',
        // onSuccess: () => alert('Thank you for paying'),
        onSuccess: ()=> handlePayStackSuccessAction(),
        onClose: () => confirm('Are you sure you want to close?'),
    }

    // 2. FETCHES DATA FROM LOCALSTORAGE
    useEffect(()=>{
        setSum(JSON.parse(localStorage.getItem('SUM')));
        let address = JSON.parse(localStorage.getItem('ADDRESS'))
        setForm({
            email: address.email,
            name: address.name,
            amount: sum,
            phoneNumber: address.phone,
        })
    }, [sum])

    // 3. ON SUCCESSFUL PAYSTACK TRANSACTION, DO THIS
    function handlePayStackSuccessAction(){
        const reference = new Date().getTime().toString();
        console.log(reference);

        // sends reference to backend for email to the payer
        AxiosClient.post('/paystack_email', reference)
        .then((res)=>{
            console.log(res)
            navigate('/index')
        })
        .catch((error)=>{
            console.log(error)
        })

    }

  return (
    <div className="py-3 py-md-4 checkout">
        <div className="container">
            <h4>Make Payment Here</h4>
            <hr></hr>

            <div className="row">
                <div className="col-md-12 mb-4">
                    <div className="shadow bg-white p-3">
                        <h4 className="text-primary">
                            Item Total Amount :
                            <span className="float-end">${sum}</span>
                        </h4>
                    </div>
                </div>

                <div className="col-md-12 mb-3">
                    <div className="d-md-flex align-items-start">
                        <div className="nav col-md-3 flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <PaystackButton {...componentProps} className="btn btn-primary" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Payment
