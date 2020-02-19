import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import {Redirect} from 'react-router-dom';
import "./Item.css";

class Item extends Component {
    state={newFileName:'',isNew:'',redirecttoLoginRegistes:false,isError:false,redirecttoHome:false,quantity:''};

    componentWillMount() {
        this.setState({newFileName:'aaaaa'});
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
    addOrder = () =>{
        this.setState({isError:false});
        axios.post('/users/order',{userID:this.props.user.userID,itemID:this.props.item.itemID,quantity:this.state.quantity
        }).then(res => {
            if(res.status===201){
                alert("הזמנה בוצע בהצלחה !!!!");
                this.setState({redirecttoHome:true})
            }
            else{
                this.setState({isError:true});
                console.log(`error code : &{res.status}`);
            }
        }).catch(err => {
            console.log(err);
            this.setState({isError:true});
        });
    } 
    addshoppingCard = () =>{
        this.setState({isError:false});
        axios.post('/users/shoppingCard',{userID:this.props.user.userID,itemID:this.props.item.itemID,quantity:this.state.quantity
        }).then(res => {
            if(res.status===201){
                alert("פריט בעגלה  !!!!");
                this.setState({redirecttoHome:true})
            }
            else{
                this.setState({isError:true});
                console.log(`error code : &{res.status}`);
            }
        }).catch(err => {
            console.log(err);
            this.setState({isError:true});
        });
    } 
    goToHome = () =>{
        this.setState({redirecttoHome:true});
    }         
    render() {
        if(this.state.redirecttoLoginRegistes){
            return <Redirect to = '/Login_register' />
        }  
        if(this.state.redirecttoHome){
            return <Redirect to = '/' />
        }         
        return (
            <div className = "Homediv">
                <img src={this.props.item.img}/>
                
                <div className="w-30 p-3 float-right"><h6>{this.props.item.description} </h6></div>
                <div className="w-15 p-3 float-right"><h5>{this.props.item.price}  ₪ </h5></div>
                <br/><br/>
                <input style={{width:'150px'}} onChange = {evt => this.setState({quantity:evt.target.value})} type='number' value={this.state.quantity} placeholder=" &ensp; &ensp;&ensp;&ensp; &ensp; כמות   " /> 
                <br/><br/>
                {!this.props.user ? <Button  variant="outline-dark"  className="Buttons" onClick = {this.register}>הירשם</Button> : ''}
                {!this.props.user ? <Button  variant="outline-dark" className="Buttons"  onClick = {this.login}>רישום</Button> : ''}                

                {this.props.user ? <Button  variant="outline-dark" className="Buttons" onClick = {this.addOrder}>קנה עכשיו</Button> : ''}
                {this.props.user ? <Button  variant="outline-dark" className="Buttons"  onClick = {this.addshoppingCard}>הוסיף לעגלה</Button> :''}
                <Button  variant="outline-info" className="Buttons" onClick = {this.goToHome}> חזור</Button>
            </div>
        );
    }
}

export default Item;