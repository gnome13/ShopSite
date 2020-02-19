import React, { Component } from "react";
import { BrowserRouter , Switch, Route, Link} from 'react-router-dom';
import "./App.css";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './Home';
import Login_register from './Login_register';
import RegisterDetails from './RegisterDetails';
import Items from './Items';
import Item from './Item';
import ShoppingCardDetails from './ShoppingCardDetails';
import Orders from './Orders';
import Categoriot from './Categoriot';
import ItemsUpdate from './ItemsUpdate';
import NotFound from './NotFound';

class App extends Component {
  url = "/api";
  state = { user: '', categoriot:'', categoriotIndex:'',categoriotName:'', product:'',items:'',itemIndex:'',shoppingCard:'',orders:'',newuser:false,redirecttoLoginRegistes:false,userAdress:''};

  setNewUser = newuser =>{
    this.setState({newuser:newuser});
    this.setState({redirecttoLoginRegistes:true});
    
  };
  setCategoriot = categoriot =>{
    this.setState({categoriot:categoriot});
  };
  setCategoriotName = name =>{
    this.setState({categoriotName:name});
  };
  setCategoriotIndex = index =>{
    this.setState({categoriotIndex:index});
  };
  setItems = items =>{
    this.setState({items:items});
  }; 
  setshoppingCard = shoppingCard =>{
    this.setState({shoppingCard:shoppingCard});
  };   
  setOrders = orders =>{
    this.setState({orders:orders});
  };     
  setItemIndex = index =>{
    this.setState({itemIndex:index});
  };   
  setuserAdress = userAdress =>{
    this.setState({userAdress:userAdress});
    console.log(this.state.userAdress,'app userAdress');
  };
  setUser = user =>{
    this.setState({user:user});
  };

  clickHandler = () => {
    console.log("clicked");
    axios
      .get(this.url)
      .then(res => {
        console.log(res.data.res);
        this.setState({ data: res.data.res });
      })
      .catch(err => console.log(err));

  };

  render() {
    return (
      
      <BrowserRouter>
      <div className="App">
        <br></br>
        {/* <Link to = '/'>Home</Link> */}
        {/* <Link to = '/Login_register'>Login_register</Link> */}
        <Switch>
        
          <Route exact path='/' render = {() => <Home user = {this.state.user} setCategoriot={this.setCategoriot} setCategoriotIndex = {this.setCategoriotIndex} setCategoriotName = {this.setCategoriotName} setItems ={this.setItems} setOrders = {this.setOrders} setshoppingCard = {this.setshoppingCard} setuserAdress = {this.setuserAdress} setNewUser={this.setNewUser}/> }/>
          <Route exact path ='/Login_register' render = {() => <Login_register setUser={this.setUser} newuser = {this.state.newuser} setNewUser={this.setNewUser}/> }/> 
          <Route exact path ='/RegisterDetails' render = {() => <RegisterDetails setuserAdress={this.setuserAdress} user = {this.state.user} userAdress = {this.state.userAdress} setUser={this.setUser}/> }/> 
          <Route exact path ='/Items' render = {() => <Items items={this.state.items} setItemIndex = {this.setItemIndex} categoroitName={this.state.categoriotName} /> }/> 
          <Route exact path ='/Item' render = {() => <Item item={this.state.items[this.state.itemIndex]} user = {this.state.user} setNewUser={this.setNewUser} /> }/> 
          <Route exact path ='/ShoppingCardDetails' render = {() => <ShoppingCardDetails user = {this.state.user} shoppingCard = {this.state.shoppingCard}/> }/> 
          <Route exact path ='/Orders' render = {() => <Orders user = {this.state.user} orders = {this.state.orders}/> }/> 
          <Route exact path ='/Categoriot' render = {() => <Categoriot categoriot = {this.state.categoriot} setCategoriot={this.setCategoriot} setCategoriotIndex = {this.setCategoriotIndex} setCategoriotName = {this.setCategoriotName}  setItems ={this.setItems}/> }/> 
          <Route exact path ='/ItemsUpdate' render = {() => <ItemsUpdate items={this.state.items} setItemIndex = {this.setItemIndex} setItems ={this.setItems} categoroitName={this.state.categoriotName} categoriotIndex = {this.state.categoriotIndex}/> }/> 
          
          <Route  component={NotFound}/>
        </Switch>        


        {/* <Button>ClickMe</Button>
        <Button variant="primary">Primary</Button>         */}
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
