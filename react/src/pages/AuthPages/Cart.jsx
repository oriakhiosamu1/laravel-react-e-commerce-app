// import React from 'react'
import './cart.css'
import smartwatch from '../../images/smartwatch.jpg';
import { useEffect, useState } from 'react';
import AxiosClient from '../../Axios/Axios';
import { Link } from 'react-router-dom';

const Cart = () => {
    // VARIABLES USED IN THIS COMPONENTS====================================================================
    const [isLoading, setIsLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [removeCart, setRemoveCart] = useState(false);
    // VARIABLES USED IN THIS COMPONENTS====================================================================

    // FETCHES CART DATA FOR LOGGED IN USER===================================================================
    useEffect(()=>{
        AxiosClient.get('/cart')
        .then((res)=>{
            // console.log(res);
            setIsLoading(false);
            setCart(res.data);
        })
        .catch((err)=>{
            console.log(err);
            setIsLoading(false);
        })
    }, [cart]);
    // FETCHES CART DATA FOR LOGGED IN USER===================================================================

    // REMOVES USER'S CART DATA=====================================================================
    function removeCartData(id){
        setRemoveCart(true)

        AxiosClient.delete(`/remove/${id}`)
        .then((res)=>{
            console.log(res);
            setRemoveCart(false)
        })
        .catch((err)=>{
            console.log(err);
            setRemoveCart(false)
        })
    }
    // REMOVES USER'S CART DATA=====================================================================


    if(isLoading === true){
        return <h2>FETCHING YOUR CART DATA</h2>
    }

  return (
    <div className="py-3 py-md-5 bg-light">
        <div className="container">

            <div className="row">
                <div className="col-md-12">
                    <div className="shopping-cart">

                        <div className="cart-header d-none d-sm-none d-mb-block d-lg-block">
                            <div className="row">
                                <div className="col-md-6">
                                    <h4>Product Name</h4>
                                </div>
                                <div className="col-md-2">
                                    <h4>Price</h4>
                                </div>
                                <div className="col-md-2">
                                    <h4>Quantity</h4>
                                </div>
                                <div className="col-md-2">
                                    <h4>Remove</h4>
                                </div>
                            </div>
                        </div>

                        {/* DISPLAYS USERS CART DATA */}
                        {cart.map((c)=> {
                            return (
                            <div key={c.id} className="cart-item">
                                <div className="row">
                                    <div className="col-md-6 my-auto">
                                            <Link to={`/index/product/${c.product_id}`}>
                                                <label className="product-name">
                                                    <img src={smartwatch} width="50px" height="50px" alt="" />
                                                    <Link to={`/index/product/${c.product_id}`}>
                                                        {c.name}
                                                    </Link>
                                                </label>
                                            </Link>
                                    </div>

                                    <div className="col-md-2 my-auto">
                                        <label className="price">${c.price} </label>
                                    </div>

                                    <div className="col-md-2 col-7 my-auto">
                                        <div className="quantity">
                                            <div className="input-group">
                                                <input type="text" name='quantity' value={c.quantity} className="input-quantity" disabled/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-2 col-5 my-auto">
                                        <div className="remove">
                                            <button onClick={(e)=> removeCartData(c.id)} className="btn btn-danger btn-sm">
                                                <i className="fa fa-trash"></i> {removeCart ? 'Loading...' : 'Remove'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            );
                        })}
                        {/* DISPLAYS USERS CART DATA */}

                        {cart.length === 0 && <h2>NO DATA IN CART</h2>}
                        {cart.length !== 0 &&
                            <Link to='/index/checkout' className="btn btn-danger btn-sm">Checkout Form</Link>
                        }
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Cart
