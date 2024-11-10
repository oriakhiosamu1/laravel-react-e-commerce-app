// import React from 'react'

import { Navigate, Outlet } from "react-router-dom"
import AuthenticatedNavBar from "../components/AuthenticatedNavBar"
import { useStateContext } from "../context/ContextProvider"

const AuthLayout = () => {

    const {token} = useStateContext();

    if(!token){
        return <Navigate to='/sign-in' />
    }

  return (
    <div>
        <AuthenticatedNavBar />
        <Outlet />
    </div>
  )
}

export default AuthLayout
