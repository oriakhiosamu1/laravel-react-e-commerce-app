// import React from 'react'
import { Navigate } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';
// import AuthLayout from './AuthLayout';
import DefaultLayout from './DefaultLayout';

const GuestLayout = () => {

    const {token} = useStateContext();

    if(token){
        return <Navigate to='/index' />
    }else{
        return <DefaultLayout />
    }
}

export default GuestLayout
