import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {Redirect} from 'react-router-dom';

class Items extends Component {
    state={newFileName:'',redirectToItems:false,redirecttoHome:false};

    componentWillMount() {
        this.setState({newFileName:'aaaaa'});
    };  
    getItem = (index) =>{
 
        this.props.setItemIndex(index);
        this.setState({ redirectToItems: true });
    }  ;    
    goToHome = () =>{
        this.setState({redirecttoHome:true});
    }  
    render() {
        const elements = this.props.items.map((item,index) => (
            <div key={index} >
                <img onClick ={() => this.getItem(index)} src={item.img}/>
                {/* <img  src={item.img}/>  */}
                <div className="w-30 p-3 float-right"><h6>{item.description} </h6></div>
                <div className="w-15 p-3 float-right"><h5>{item.price}  ₪ </h5></div> 
                <br/><br/>
            </div>
        ))  
        if(this.state.redirectToItems){
            return <Redirect to = '/Item' />
        } 
        if(this.state.redirecttoHome){
            return <Redirect to = '/' />
        }   

        return (
            <div className = "Homediv">
                <br></br>
                <h2>{this.props.categoroitName}</h2>
                {elements}
                <br></br>
                <Button  variant="outline-info" className="Buttons" onClick = {this.goToHome}> חזור</Button>    
            </div>
        );
    }
}

export default Items;