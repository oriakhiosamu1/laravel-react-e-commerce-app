// import React from 'react'
import { Link } from 'react-router-dom';
import './NotFounf.css';

const NotFound = () => {
  return (
    <div>
      <h1>PAGE NOT FOUND</h1>
      <div className='not-found-return-div'>
        <Link className='link' to='/'>Return to Home</Link>
      </div>
    </div>
  )
}

export default NotFound
