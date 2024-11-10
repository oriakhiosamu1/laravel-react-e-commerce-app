// import React from 'react'
import './view.css';
import smartwatch from '../../images/smartwatch.jpg';
import { useEffect, useState } from 'react';
import AxiosClient from '../../Axios/Axios';
import { useParams } from 'react-router-dom';

const View = () => {
    const {id} = useParams();
    const [product, setProduct] = useState([]);
    // const [product, setProduct] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [quantity, setQuantity] = useState("1");
    const [addCart, setAddCart] = useState(false);

    // 1. FETCHES PARTICULAR PRODUCT

    // 1.1. FETCHES DATA STORED IN LOCALSTORAGE
    useEffect(()=>{
        const storage = JSON.parse(localStorage.getItem('PRODUCTS'));

        const filter = storage.filter((product)=>{
            return product.id.toString() === id;
        });

        console.log(filter[0])

        setProduct(filter[0]);
    }, [id])

    // useEffect(()=>{
    //     AxiosClient.get(`/product/${id}`)
    //     .then((res)=>{
    //         // console.log(res);
    //         setProduct(res.data);
    //         setIsLoading(false)
    //     })
    //     .catch((err)=>{
    //         console.log(err);
    //         setIsLoading(false)
    //     })
    // }, [id])

    // 2. HANDLES ADD TO CART FUNCTION
    function handleAddToCart(e){
        e.preventDefault();
        setAddCart(true);

        AxiosClient.post(`/add_to_cart/${id}/${quantity}`)
        .then((res)=>{
            console.log(res.data)
            setAddCart(false);
        })
        .catch((err)=>{
            console.log(err);
            setAddCart(false);
        })
    }

    // COMMENTED OUT BECAUSE FETCHING FROM LOCALSTORAGE WORKED
    // if(isLoading==true){
    //     return <h2>FETCHING DATA....</h2>
    // }


  return (
    <div className="py-3 py-md-5 bg-light">
        <div className="container">
            <div className="row">
                <div className="col-md-5 mt-3">
                    <div className="bg-white border">
                        <img src={smartwatch} className="w-100" alt="Img" />
                    </div>
                </div>

                <div className="col-md-7 mt-3">
                    <div className="product-view">
                        <h4 className="product-name">
                            {product.name}
                            <label className="label-stock bg-success">{product.inStock ? 'In Stock' : 'Off Stock'}</label>
                        </h4>
                        <hr></hr>
                        <p className="product-path">
                            {product.category}
                        </p>
                        <div>
                            <span className="selling-price">${product.price}</span>
                        </div>
                        <form onSubmit={handleAddToCart}>
                            <div className="mt-2">
                                <div className="input-group">
                                    <input type="text" name='quantity' onChange={(e)=>setQuantity(e.target.value)} value={quantity} className="input-quantity" required/>
                                </div>
                            </div>
                            <div className="mt-2">
                                <button type='submit' onClick={handleAddToCart} className="btn btn1"> <i className="fa fa-shopping-cart"></i> {addCart ? 'Loading...' : 'Add To Cart'} </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12 mt-3">
                    <div className="card">
                        <div className="card-header bg-white">
                            <h4>Description</h4>
                        </div>
                        <div className="card-body">
                            <p>{product.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default View
