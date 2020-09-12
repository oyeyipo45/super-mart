import React from 'react'

const CheckoutSteps = (props) => {
    return (
        <div className="checkoutSteps">
<div className={props.step1 ? 'active' : '' } > Sign in</div>
<div className={props.step2 ? 'active' : '' } > Shipping</div>
<div className={props.step3 ? 'active' : '' } > Payment</div>
<div className={props.step4 ? 'active' : '' } > Place order</div>
            
        </div>
    )
}

export default CheckoutSteps
