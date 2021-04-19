import React from "react";
import Cart from "./Cart";
import Navbar from "./Navbar";
import firebase from "firebase/app";
import "firebase/firestore";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading: true,
    };
    this.db = firebase.firestore();
  }

  componentDidMount() {
    // listener to attached
    // firebase
    //   .firestore()
    //   .collection('products')
    //   .get()
    //   .then((snapshot)=>{
    //     console.log(snapshot);

    //     snapshot.docs.map((doc)=>{
    //       console.log(doc.data());
    //     });
    //     const products = snapshot.docs.map((doc)=>{
    //       const data =  doc.data();
    //       data['id'] = doc.id;
    //       return data;
    //     })
    //     this.setState({
    //       products : products,
    //       loading :false
    //     })

    //   })

    // listener attached that is onsnapshot
    this.db.collection("products").onSnapshot((snapshot) => {
      console.log(snapshot);

      snapshot.docs.map((doc) => {
        console.log(doc.data());
      });
      const products = snapshot.docs.map((doc) => {
        const data = doc.data();
        data["id"] = doc.id;
        return data;
      });
      this.setState({
        products: products,
        loading: false,
      });
    });
  }

  handleIncreaseQuantity = (product) => {
    console.log(product);
    const { products } = this.state;
    const index = products.indexOf(product);
    // this.setState({products:products})
    const docRef = this.db.collection("products").doc(products[index].id);
    docRef
      .update({
        qty: products[index].qty + 1,
      })
      .then(() => {
        console.log("updated succesfully");
      })
      .catch((error) => {
        console.log("error :", error);
      });
  };

  handleDecreaseQuantity = (product) => {
    console.log(product);
    const { products } = this.state;
    const index = products.indexOf(product);
    const qty = products[index].qty;
    // 
    
    const docRef = this.db.collection("products").doc(products[index].id);
    if(products[index].qty===0)
      return;
    docRef
      .update({
        qty: products[index].qty - 1,
      })
      .then(() => {
        console.log("updated succesfully");
      })
      .catch((error) => {
        console.log("error :", error);
      });


  };
  handleDelete = (id) => {
    const { products } = this.state;
    // const items = products.filter((item) => item.id !== id); // return another arrays without that id
    // this.setState({
    //   products: items,
    // });

    const docRef = this.db.collection("products").doc(id);
    docRef
      .delete()
      .then(()=>{
        console.log("deleted succesfully");
      })
      .catch((error=>{
        console.log("error : ",error);
      }))
  };

  getCartCount = () => {
    const { products } = this.state;
    let count = 0;
    products.forEach((product) => {
      count += product.qty;
    });
    return count;
  };

  getCartTotal = () => {
    const { products } = this.state;
    let cartTotal = 0;
    products.map((product) => {
      cartTotal = cartTotal + product.qty * product.price;
    });
    return cartTotal;
  };

  render() {
    const { products, loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteQuantity={this.handleDelete}
        />
        {loading && <h1>Product loading</h1>}
        <div style={{ fontSize: 20, padding: 10 }}>
          Total : {this.getCartTotal()}
        </div>
      </div>
    );
  }
}

export default App;
