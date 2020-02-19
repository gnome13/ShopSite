import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {Redirect} from 'react-router-dom';
import Button from 'react-bootstrap/Button';

class ShoppingCardDetails extends Component {
    state={newFileName:'',redirecttoHome:false,shoppingCard:'',checkedAll:false,isError:false};

    componentWillMount() {
        this.state.shoppingCard=[...this.props.shoppingCard];
        this.setState({shoppingCard:this.props.shoppingCard});
        console.log(this.state.shoppingCard);
    };  
    handleCheckboxChange = (index,e) => {
        var checkedConst;
        
        checkedConst  = this.state.shoppingCard[index];
        checkedConst.checked= e.target.checked;
        this.state.shoppingCard[index]={...checkedConst};
        this.setState({newFileName: 'checkedConst'  });
    };
    handleCheckboxAllChange = event =>  {
        for (let index = 0; index < this.state.shoppingCard.length; index++) {
            this.state.shoppingCard[index].checked=event.target.checked;
        }
        this.setState({ checkedAll: event.target.checked })
    }
    addOrder = () =>{
        this.setState({isError:false});
        for (let index = 0; index < this.state.shoppingCard.length; index++) {
            const element = this.state.shoppingCard[index];
            if(element.checked===true){
                axios.post('/users/order',{userID:element.userID,itemID:element.itemID,quantity:element.quantity
                }).then(res => {
                    if(res.status===201 && index===this.state.shoppingCard.length-1){
                        alert("הזמנות בוצוע בהצלחה !!!!");
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
                console.log(element.userID,); 
                axios.delete('/shoppingCard?userID=' + Number(element.userID)+'&itemID='+Number(element.itemID))
                .then(res => {

                }).catch(err => {
                    console.log(err);
                    this.setState({isError:true});
                });                  
            }                         
            else if(index===this.state.shoppingCard.length-1){
                alert("הזמנות בוצוע בהצלחה !!!!");
                this.setState({redirecttoHome:true});
            }
        }
    }  
    goToHome = () =>{
        this.setState({redirecttoHome:true});
    }    
    render() {
        const elements = this.state.shoppingCard.map((shoppingCard,index) => (

            <div key={index} >
                <div className="w-60 p-5 float-left"><h6> </h6></div>
                <div  className="w-60 p-2 float-left"><img src={shoppingCard.img}/></div>
                <div className="w-60 p-5 float-right"><h6> </h6></div>
                <div className="float-right" style={{width:'5px'}}><input type="checkbox" checked={this.state.shoppingCard[index].checked} value={index} onChange={this.handleCheckboxChange.bind(this, index)} /></div>

                <div className="w-30 p-3 float-right"><h6>{shoppingCard.description} </h6></div>
                <div className="w-15 p-3 float-right"><h5>{shoppingCard.price}  ₪ </h5></div>
                <div  className="w-150 p-2 float-right"><input className="w-200 p-1 float-left" style={{width:'50px'}} onChange = {evt => shoppingCard.quantity = evt.target.value} type='number' value={shoppingCard.quantity} placeholder=" &ensp; &ensp;&ensp;&ensp; &ensp; כמות   " /></div>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </div>
        ))  
        if(this.state.redirecttoHome){
            return <Redirect to = '/' />
        }          
        return (
            <div className = "Homediv">
                <br></br>
                <div>
                <label>
                <input type='checkbox' checked={this.state.checkedAll} onChange={this.handleCheckboxAllChange}/>
                <span>בחר הכול</span>
                </label>
                </div><br/>
                {elements}
                <Button  variant="outline-info" className="Buttons" onClick = {this.addOrder}>קנה הכל</Button>
                <Button  variant="outline-info" className="Buttons" onClick = {this.goToHome}> חזור</Button>
            </div>
        );
    }
}

export default ShoppingCardDetails;