// import React from 'react'
import './dashboard.css';
import smartwatch from '../../images/smartwatch.jpg';
import { Link } from "react-router-dom";


import { useState } from 'react';
import AxiosClient from '../../Axios/Axios';

const Dashboard = () => {
    // 1. VARIABLES
    const [storage, setStorage] = useState([]);

    // 2. FETCHING DATA UPON LOGGING IN
    useState(()=>{
        AxiosClient.get('/products')
        .then((res)=>{
            setStorage('PRODUCTS', localStorage.setItem('PRODUCTS', JSON.stringify(res.data)));
            console.log(res.data)
        })
        .catch((err)=>{
            console.log(err);
        })
    }, []);

    console.log(storage);

    // 3.CATEGORIES SETTING
    const category = {
        iphone: "iphone",
        samsung: "samsung",
        lg: "lg",
        pixel: "pixel"
    };

  return (
    <div className="py-3 py-md-5 bg-light">
        <div className="container">
            <div className="row">

                <div className="col-md-12">
                    <h4 className="mb-4">Our Categories</h4>
                </div>

                <div className="col-6 col-md-3">
                    <div className="category-card">
                        <Link to = {`/index/products/${category.iphone}`}>
                            <div className="category-card-img">
                                <img src={smartwatch} className="w-100" alt="Laptop" />
                            </div>
                            <div className="category-card-body">
                                <h5>IPhone</h5>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="col-6 col-md-3">
                    <div className="category-card">
                        <Link to={`/index/products/${category.samsung}`}>
                            <div className="category-card-img">
                                <img src={smartwatch} className="w-100" alt="Mobile Devices" />
                            </div>
                            <div className="category-card-body">
                                <h5>Samsung</h5>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="col-6 col-md-3">
                    <div className="category-card">
                        <Link to={`/index/products/${category.lg}`}>
                            <div className="category-card-img">
                                <img src={smartwatch} className="w-100" alt="Mens Fashion" />
                            </div>
                            <div className="category-card-body">
                                <h5>LG</h5>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="col-6 col-md-3">
                    <div className="category-card">
                        <Link to={`/index/products/${category.pixel}`}>
                            <div className="category-card-img">
                                <img src={smartwatch} className="w-100" alt="Mens Fashion" />
                            </div>
                            <div className="category-card-body">
                                <h5>Pixel</h5>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard
