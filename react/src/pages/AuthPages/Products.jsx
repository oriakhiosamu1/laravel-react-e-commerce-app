// import React from 'react'
import './product.css';
import smartwatch from '../../images/smartwatch.jpg';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AxiosClient from '../../Axios/Axios';

const Products = () => {

    // 1. FETCH ROUTE PARAM
    const {category} = useParams();

    // 2. FETCH PRODUCTS FROM DATABASE

    const [products, setProducts] = useState([]);
    useEffect(()=>{
        setProducts(JSON.parse(localStorage.getItem('PRODUCTS')));
    }, [])

    // const [products, setProducts] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);

    // useEffect(()=>{
    //     AxiosClient.get('/products')
    //     .then((res)=>{
    //         // console.log(res.data);
    //         setProducts(res.data);
    //         setIsLoading(false);
    //     })
    //     .catch((err)=>{
    //         console.log(err);
    //         setIsLoading(false);
    //     })
    // }, []);


    //WORKED, BUT NEEDS AN ALTERNATIVE
    // 3. FILTERS PRODUCTS BASED ON PRODUCT CATEGORY
    useEffect(()=>{
        if(category){

            const filter = products.filter((product)=>{
                return product.category.toLowerCase().includes(category.toLowerCase());
            });

            setProducts(filter);
        }
    }, [category, products])

    // console.log(products.picture);

    // COMMENTED OUT BECAUSE FETCHING FROM LOCALSTORAGE WORKED
    // if(isLoading==true){
    //     return <h2>FETCHING PRODUCTS....</h2>
    // }

    return(
        <div className="py-3 py-md-5 bg-light">
            <div className="container">

                <div className="row">

                    <div className="col-md-12">
                        <h4 className="mb-4">Our Products</h4>
                    </div>

                    {products.map((product)=>{
                        return (
                        <div key={product.id} className="col-md-3">
                            <div className="product-card">

                                <div className="product-card-img">
                                    <label className="stock bg-success">{product.inStock ? 'In Stock' : 'Off Stock'}</label>
                                    <img src={smartwatch} alt={product.name} />
                                    {/* <img src={`http://localhost:8000/public/storage/${product.picture}`} alt={product.name} /> */}
                                </div>

                                <div className="product-card-body">
                                    <p className="product-brand">{product.category}</p>
                                    <h5 className="product-name">
                                    <Link to={`/index/product/${product.id}`}>
                                        {product.name}
                                    </Link>
                                    </h5>

                                    <div>
                                        <span className="selling-price">${product.price}</span>
                                    </div>

                                    <div className="mt-2">
                                        {/* <button onClick={(e)=> addToCart(product.id)} className="btn btn1">{isAddingToCart ?'Loading...' : 'Add To Cart'}</button> */}
                                        <Link to={`/index/product/${product.id}`} className="btn btn1"> View </Link>
                                    </div>

                                </div>

                            </div>
                        </div>)
                    })}

                </div>
            </div>
        </div>
    );
}

export default Products

