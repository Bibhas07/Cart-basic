import React from "react";
import CartItem from './CartItem';


const CART = (props) => {
        const {products} = props;
        return (
            <div className="cart">               
                {products.map((product) =>{
                  return  <CartItem  
                  product={product} 
                  key={product.id}  
                     onIncreaseQuantity = {props.onIncreaseQuantity} //reference given
                     onDecreaseQuantity = {props.onDecreaseQuantity}
                     onHandleDelete={props.onHandleDelete}
                    />
                })}         
                </div>
        )    
    }
    

export default CART;