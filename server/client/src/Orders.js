import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {Redirect} from 'react-router-dom';
import Button from 'react-bootstrap/Button';

class Orders extends Component {
    state={newFileName:'',redirecttoHome:false,orders:'',isError:false};

    componentWillMount() {
        this.state.orders=[...this.props.orders];
        this.setState({orders:this.props.orders});
        console.log(this.state.orders);
    };  

    goToHome = () =>{
        this.setState({redirecttoHome:true});
    }    
    render() {
        const elements = this.state.orders.map((orders,index) => (

            <div key={index} >
                <div className="w-60 p-5 float-left"><h6> </h6></div>
                <div  className="w-60 p-2 float-left"><img src={orders.img}/></div>
                <div className="w-60 p-5 float-right"><h6> </h6></div>

                <div className="w-30 p-3 float-right"><h6>{orders.description} </h6></div>
                <div className="w-15 p-3 float-right"><h5>{orders.price}  ₪ </h5></div>
                
                <div className="w-20 p-3  float-right"><h5>כמות  {orders.quantity}   </h5></div>
                <br/>
                <div className="w-160 p-5 float-right"><h6>  &ensp; &ensp;&ensp;&ensp; &ensp;</h6></div>
                <div className="w-20 p-3  float-right"><h6>סטטוס {orders.statusName}   </h6></div>
                <div className="w-20 p-3  float-right"><h6>תאריך הזמנה {orders.date}   </h6></div>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </div>
        ))  
        if(this.state.redirecttoHome){
            return <Redirect to = '/' />
        }          
        return (
            <div className = "Homediv">
                <br></br>
                
                {elements}
                <Button  variant="outline-info" className="Buttons" onClick = {this.goToHome}> חזור</Button>
            </div>
        );
    }
}

export default Orders;