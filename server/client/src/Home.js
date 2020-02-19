import React, { Component } from 'react';
import axios from "axios";
import HomePage from './HomePage.jpg'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Redirect} from 'react-router-dom';

class Home extends Component {
    state={categoriot:[],isNew:false,redirecttoLoginRegistes:false,navigateToItems:false,items:[],navigateToshoppingCard:false,navigateToOrders:false,orders:[],navigateToRegisterDetails:false,navigateToCategoriot:false};

 
    componentWillMount() {
        axios
        .get('/categoriot')
        .then(res => {
          this.setState({ categoriot: res.data });
          this.props.setCategoriot(res.data);
           
        })
        .catch(err => console.log(err));
    };

    login = () =>{
        this.setState({ isNew: true });
        this.setState({ redirecttoLoginRegistes: true });
        this.props.setNewUser(false);
    }  ;  
    register = () =>{
        this.setState({ isNew: true });
        this.setState({ redirecttoLoginRegistes: true });
        this.props.setNewUser(true);
    } ;     
    getItems = (index,name) =>{
        this.props.setCategoriotIndex(index);
        this.props.setCategoriotName(name); 

        // console.log(index);
        axios
        .get('/items?categoriotID=' + Number(index))
        .then(res => {
          this.setState({ items: res.data });
           for (let index1 = 0; index1 < this.state.items.length; index1++) {
               const item = this.state.items[index1];
               axios.get(`/images/${item.picture}`,{responseType:'blob'})
               .then(res=>{
                   if ( res.status===200 ) {
                       const reader = new FileReader();
                       reader.readAsDataURL(res.data);
                       const _this = this;
                       reader.onload = function(){
                           const imageDataURL = reader.result;
                           _this.setState({img:imageDataURL});
                            item= {...item,  img: imageDataURL };
                            _this.state.items[index1]={...item,  img: imageDataURL };

                            if (index1===_this.state.items.length-1)  {
                                // console.log('if',_this.state.items);
                                _this.props.setItems(_this.state.items);
                                _this.setState({navigateToItems:true});
                            }                 
                       }
                   }
                   else{
                       console.log(`error status code :${res.status} `)
                   }
               }).catch(err=>console.log(err));         
               
           } 
        })
        .catch(err => console.log(err));
    } ;
    getshoppingCard = () =>{

        // console.log(index);
        axios
        .get('/shoppingCard?userID=' + Number(this.props.user.userID))
        .then(res => {
          this.setState({ items: res.data });
          //check if feild cheked exists
          if(this.state.items[0].checked===false){
                this.props.setshoppingCard(this.state.items);
                this.setState({navigateToshoppingCard:true});              
          }
          else{
              console.log(true);
            for (let index1 = 0; index1 < this.state.items.length; index1++) {
                const item = this.state.items[index1];
                axios.get(`/images/${item.picture}`,{responseType:'blob'})
                .then(res=>{
                    if ( res.status===200 ) {
                        const reader = new FileReader();
                        reader.readAsDataURL(res.data);
                        const _this = this;
                        reader.onload = function(){
                            const imageDataURL = reader.result;
                            _this.setState({img:imageDataURL});
                             item= {...item,  img: imageDataURL };
                             _this.state.items[index1]={...item,  img: imageDataURL , checked : false};
 
                             if (index1===_this.state.items.length-1)  {
                                 // console.log('if',_this.state.items);
                                 _this.props.setshoppingCard(_this.state.items);
                                 _this.setState({navigateToshoppingCard:true});
                             }                 
                        }
                    }
                    else{
                        console.log(`error status code :${res.status} `)
                    }
                }).catch(err=>console.log(err));         
            }               
          }
        })
        .catch(err => console.log(err));
    } ;  
    getOrders = () =>{

        // console.log(index);
        axios
        .get('/orders?userID=' + Number(this.props.user.userID))
        .then(res => {
          this.setState({ orders: res.data });
          //check if feild cheked exists
          if(this.state.orders[0].img){
                this.props.setOrders(this.state.orders);
                this.setState({navigateToOrders:true});              
          }
          else{
            for (let index1 = 0; index1 < this.state.orders.length; index1++) {
                const order = this.state.orders[index1];
                axios.get(`/images/${order.picture}`,{responseType:'blob'})
                .then(res=>{
                    if ( res.status===200 ) {
                        const reader = new FileReader();
                        reader.readAsDataURL(res.data);
                        const _this = this;
                        reader.onload = function(){
                            const imageDataURL = reader.result;
                            _this.setState({img:imageDataURL});
                            order= {...order,  img: imageDataURL };
                             _this.state.orders[index1]={...order,  img: imageDataURL , checked : false};
 
                             if (index1===_this.state.orders.length-1)  {
                                 // console.log('if',_this.state.items);
                                 _this.props.setOrders(_this.state.orders);
                                 _this.setState({navigateToOrders:true});
                             }                 
                        }
                    }
                    else{
                        console.log(`error status code :${res.status} `)
                    }
                }).catch(err=>console.log(err));         
            }               
          }
        })
        .catch(err => console.log(err));
    } ;    
    getuserAdress = (index,name) =>{

        axios
        .get('/userAdress?userID=' + Number(this.props.user.userID))
        .then(res => {
          this.props.setuserAdress(res.data);
          this.setState({ navigateToRegisterDetails:true});
        })
        .catch(err => console.log(err));
    } ;
    openCategoriot = () =>{
        this.setState({ navigateToCategoriot:true});
    } ;    
    render() {
        const categoriot = this.state.categoriot.map((item,index) => (
            <h5 onClick ={() => this.getItems(item.categoriot,item.description)}  key={index} >{item.description} - </h5>
        ))  
        
        if(this.state.redirecttoLoginRegistes){
            return <Redirect to = '/Login_register' />
        }   
        if(this.state.navigateToCategoriot){
            return <Redirect to = '/Categoriot' />
        }           
        if(this.state.navigateToItems){
            return <Redirect to = '/Items' />
        } 
        if(this.state.navigateToshoppingCard){
            return <Redirect to = '/ShoppingCardDetails' />
        }   
        if(this.state.navigateToOrders){
            return <Redirect to = '/Orders' />
        }   
        if(this.state.navigateToRegisterDetails){
            return <Redirect to = '/RegisterDetails' />
        }                                     
        return (
            <div className = "Homediv">  
                {this.props.user.boss ? <Button  variant="outline-info" className="Buttons"  onClick = {this.openCategoriot}> עדכון קטגוריות</Button> :''}
                {this.props.user ? <Button  variant="outline-info" className="Buttons"  onClick = {this.getuserAdress}> עדכון פרטים</Button> :''}
                {this.props.user ? <Button  variant="outline-info" className="Buttons" onClick = {this.getshoppingCard}> עגלת קניות</Button> : ''}
                {this.props.user ? <Button  variant="outline-info" className="Buttons"  onClick = {this.getOrders}> הזמנות</Button> :''}
       
                <br></br>
                <div className="w-30 p-3 float-left" ><h4 onClick={this.login}>רישום</h4><h4 onClick={this.register}>הירשם</h4></div>
                <div className="w-15 p-3 float-right">
                    <h4>קטגוריות</h4>
                    {categoriot}
                    </div>
                <div className="w-50 p-3 float-left"><img src ={HomePage}  className = "Homediv"></img></div>
            </div>
        );
    }
}

export default Home;