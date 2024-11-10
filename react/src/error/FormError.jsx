// import React from 'react'

const FormError = ({errors}) => {
    return (
        <ul>
            {errors && Object.keys(errors).map((key)=>{
                return <small style={{ color:'red', listStyle:'none' }} key={key}>{errors[key][0]}</small>
                // return <li key={key}><small style={{ color:'red', listStyle:'none' }}>{errors[key][0]}</small></li>
            })}
        </ul>
    )
}

export default FormError

// TEST SECRET KEY     sk_test_0acebf0c2d1163acc1473d8af0aa57b20d8a3fe2
// TEST PUBLIC KEY     pk_test_b695c08766719774bb0589229cc5eb6d0b3e2373
