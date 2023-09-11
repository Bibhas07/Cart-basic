import React from "react";

const CartItem = (props) => {
    // constructor(){
    //     super();  // we are inheriting another class hence calling parent constructor it is necessary
    //     this.state = {
    //         price : 999,
    //         title: 'MOBILE Phone',
    //         qty: 1,
    //         img: ''
    //     }
    // }
    // increaseQuantity(){
    //     // console.log('test');
    //     //setState form 1
    //     this.setState({
    //         qty : this.state.qty + 1
    //     })

    //     //setState form 2
    //     this.setState((prevState) => {
    //         return{
    //             qty : prevState.qty + 1
    //         }
    //     })
    // }
    // decreaseQuantity(){
    //    const {qty} = this.state ;

    //    if(qty === 0){
    //     return 
    //    }

    //     //setState form 2
    //     this.setState((prevState) => {
    //         return{
    //             qty : prevState.qty - 1
    //         }
    //     })
    // }

        console.log('this.props ',props)
        const {price ,title , qty} = props.product; //destructuring ... 
        const{product , onHandleDelete} = props
        return(
            <div className="cart-item">
                <div className="left-block">
                    <img style={styles.image} src={product.img } />
                </div>
                <div className="right-block">
                    <div style={ {fontSize:25} }> {title} </div>
                    <div style={ {color:'#777'} } >RS : {price}</div>
                    <div style={ {color:'#777'} } >QTY : {qty}</div>
                    <div className="cart-items-actions">
                        {/* {BUTTONS} */}
                        <img 
                            src="https://cdn-icons-png.flaticon.com/128/992/992651.png" 
                            alt="increase" 
                            className = "action-icons" 
                            onClick = {() => props.onIncreaseQuantity(props.product)}
                            
                            />
                        <img 
                            src="https://cdn-icons-png.flaticon.com/128/10927/10927667.png" 
                            alt="decrease" 
                            className = "action-icons" 
                             onClick = {() => props.onDecreaseQuantity(props.product)}
                            />
                        <img 
                            src="https://cdn-icons-png.flaticon.com/128/3405/3405244.png" 
                            alt="delete" 
                            className = "action-icons" 
                            onClick={() => onHandleDelete(product.id)}
                            /> 
                    </div>

                </div>

            </div>
        )
    }


const styles={
    image:{
        height: 110,
        width: 110,
        borderRadius : 4,
        background: '#ccc'
    }
}

export default CartItem;