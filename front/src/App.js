import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    products:[],
    isLoading: "false",
   
  };

  async componentDidMount() {
    this.getProducts();
    this.getProduct()
  };

  getProducts = async () => {
    this.setState({ isLoading: true });
    try {
      const url = ("http://localhost:8080/products/list");
      const response = await fetch(url);
      
      const answer = await response.json();
      //if the answer i recieve is successful 
      if (answer.success) {
        
        this.setState({ products: answer.result, isLoading: false, error_message: "" });
        console.log( answer.result )
      } else {
        this.setState({ error_message: answer.message, isLoading: false });
      }
    } catch (err) {
      console.log("error", err);
      this.setState({ error_message: err.message, isLoading: false });
    };
  };


  //   getProduct = async () => {
  //     this.setState({ isLoading: true });
  //     try {
  //       const url = ("http://localhost:8080/products/get/${id}");
  //       const response = await fetch(url);
        
  //       const answer = await response.json();
  //       //if the answer i recieve is successful 
  //       if (answer.success) {
          
  //         this.setState({ products: answer.result, isLoading: false, error_message: "" });
  //         console.log( answer.result )
  //       } else {
  //         this.setState({ error_message: answer.message, isLoading: false });
  //       }
  //     } catch (err) {
  //       console.log("error", err);
  //       this.setState({ error_message: err.message, isLoading: false });
  //     }
  // };
  render() {
    return (
      <div className="App">
      <p>
      Here are our products details
       </p>
      <div>

        <div>
        {this.state.products.map(p=>
          <ul>
            <ul>Product title: {p.title}</ul>
            {/* <ul> src={`http://localhost:3000/products/list/${p.image_name}`}</ul> */}
             
            <ul> Product image name: {p.image_name}</ul>
            <ul>Product price:{p.price}</ul>
            <ul>Product description:{p.description}</ul>
            <ul>Product featured or not:{p.is_featured}</ul>
            
          </ul>
                    //  src={`http://localhost:8080/products/list/${p.image}`}
                    
               )}
        </div>
      
      </div>


      {/* <div>
        <h2> Get prodcut by id</h2>
        <form>
        <form onSubmit={this.onSubmit} onReset={this.toggleEditMode}>
          <input type="text" name="input_name" defaultValue={name} />
          <input type="text" name="input_email" defaultValue={email} />
          <input type="file" name="contact_image" />
          <div>
            <input type="submit" value="ok" />
            <input type="reset" value="cancel" />
        </form>
      </div> */}
      </div>
    );
  }
}

export default App;
