import React, { useEffect } from 'react'; 
import { useDispatch } from 'react-redux';
import addToCart from './../redux/actions/cartAction';
import { useSelector } from 'react-redux';




const CartScreen = (props) => {
    const cart = useSelector(state => state.cart)
     console.log(cart);
    const { cartItems } = cart
    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;

    const dispatch = useDispatch();

    useEffect(() => {

        if(productId){
            dispatch(addToCart(productId, qty))
        }
        
    }, []) 

    return (
    <div className="cart">
    <div className="cart-list">
        <ul className="cart-list-container">
            <h3>Shpooing Cart</h3>
            <div>Pricc</div>
            <li>
                {
                    cartItems.length === 0 ? 
                    <div>
                        Cart Is Empty
                    </div>
                        :
                        cartItems.map(item => 
                        <div key={item.id}>
                            <img src={item.image} alt="product" />
                            <div className="cart-name">
                                <div>
                                    {item.name}
                                </div>
                                <div>
                                    Qty: 
                                    <select>
                                        <option value="1"></option>
                                        <option value="1"></option>
                                        <option value="1"></option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                {item.price}
                            </div>
                        </div>
                        
                            )
                   
                }
            </li>
        </ul>
    </div>
    <div className="cart-action">
        <h3>
            Sub Total ( {cartItems.reduce((a, c) => a+ c.qty, 0)} items)
         :
         $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0 )}
        
        </h3>
        <button className="button primary" disabled={cartItems.length === 0} >
            Proceed To Checkout
        </button>
    </div>
    </div>
    )
}


export default CartScreen;