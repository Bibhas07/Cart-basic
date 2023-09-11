import React from 'react';
import './App.css';
import Cart from './Cart';
import Navbar from './Navbar';
import firebase from 'firebase/compat/app';

class App extends React.Component {
  constructor(){
    super();  // we are inheriting another class hence calling parent constructor it is necessary
    this.state = {
       products: [],
       loading : true
    }
    this.db = firebase.firestore()
}

componentDidMount(){
  // firebase
  //   .firestore()
  //   .collection('products')
  //   .get()
  //   .then((snapshot) => {
  //     console.log('snapshot' , snapshot)
  //     snapshot.docs.map((doc) => {
  //       console.log(doc.data())
  //     })

  //     const products = snapshot.docs.map((doc) => {
  //       const data = doc.data();
  //       data['id'] = doc.id
  //       return data
  //     })

  //     this.setState({
  //       products : products,
  //       loading : false
  //     })
  //   })

  firebase
    .firestore()
    .collection('products')
    .onSnapshot((snapshot) => {
      console.log('snapshot' , snapshot)
      snapshot.docs.map((doc) => {
        console.log(doc.data())
      })

      const products = snapshot.docs.map((doc) => {
        const data = doc.data();
        data['id'] = doc.id
        return data
      })

      this.setState({
        products : products,
        loading : false
      })
    })
  }

handleIncreaseQuantity = (product) => {
    console.log('HEy Add ' , product)
    const {products} = this.state
    const index = products.indexOf(product);

    // products[index].qty += 1
    // this.setState({
    //     products: products 
    // //array : new value from function
    // })
    const docRef = this.db.collection('products').doc(products[index].id);

    docRef
    .update({
      qty : products[index].qty + 1
    })
    .then(() => {
      console.log('Updated')
    })
    .catch( (error) => {
      console.log('error' , error)
    })
}

handleDecreaseQuantity = (product) => {
    const {products} = this.state
    const index = products.indexOf(product);

    if(products[index].qty === 0){
        return
    }

    // products[index].qty -= 1
    // this.setState({
    //     products: products 
    // //array : new value from function
    // })
    const docRef = this.db.collection('products').doc(products[index].id);

    docRef
    .update({
      qty : products[index].qty - 1
    })
    .then(() => {
      console.log('Updated')
    })
    .catch( (error) => {
      console.log('error' , error)
    })
}

handleDeleteProduct = (id) => {
    const {products} = this.state
    const docRef = this.db.collection('products').doc(id);
    docRef.delete()
    .then(() => {
      console.log('Deleted Successfully')
    }) .catch( (error) => {
      console.log('error' , error)
    })
    // const items = products.filter((item) => item.id !== id) //[{}]
    // this.setState({
    //     products: items
    // })
}
getCartCount = () => {
  const {products } = this.state;
  let count = 0 ;
  products.forEach(element => {
      count += element.qty;
  });
  return count;
}

getCartTotal = () => {
  const {products} = this.state ;
  let cartTotal = 0 ;

  products.map((product) => {
    cartTotal += product.qty * product.price
  })
  return cartTotal
}

// addProduct = () => {
//   this.db
//     .collection('products')
//     .add({
//       img : '',
//       price : 900,
//       qty : 3,
//       title : 'washing machine'
//     })
//     .then((docRef) => {
//       console.log("product has been added " ,docRef)
//     })
//     .catch((error) => {
//       console.log('Error :' ,error)
//     })
// }

  render(){
    const { products , loading } = this.state;
  return (
    <div className="App">
    <Navbar count = {this.getCartCount()} />
    {/* <butto n onClick={this.addProduct} >ADD A PRODUCT</butto> */}
    <Cart
    products = {products}
       onIncreaseQuantity = {this.handleIncreaseQuantity} //reference given
       onDecreaseQuantity = {this.handleDecreaseQuantity}
       onHandleDelete={this.handleDeleteProduct}
    
    />

    {loading && <h4> Loading Products ..</h4>}
    <div style={{fontSize : 20 , padding: 10}}>Total : {this.getCartTotal()}</div>
    </div>
  );
}
} 

export default App;
