import React, { Component } from "react";
import axios from "axios";
import {Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import "./RegisterDetails.css";

class RegisterDetails extends Component {
    state = { userAdress:'', userName:'',telefon:'',boss:false,shipingYes:true,street:'',
        house:'',flat:'',town:'',postcode:'',redirecttoHome:false,user:'',buttonName:''};
 
    componentWillMount() {
        
        this.setState({ userName: this.props.user.userName });
        this.setState({ telefon: this.props.user.telefon });
        this.setState({ boss: this.props.user.boss });
        if (this.props.userAdress[0]){
            this.setState({street:this.props.userAdress[0].street});
            this.setState({ house: Number(this.props.userAdress[0].house)});
            this.setState({ flat: Number(this.props.userAdress[0].flat) });   
            this.setState({ town: this.props.userAdress[0].town });
            this.setState({ postcode: Number(this.props.userAdress[0].postcode) }); 
            this.setState({ buttonName: 'עדכון' }); 
        }
        else{ this.setState({ buttonName: 'רשום' }); }
    };    
    registerDetails = () =>{
        this.setState({isError:false});
        if (this.props.userAdress[0]){
            axios.post('/users/userAdress',{userID:this.props.user.userID,
                shipingYes:this.state.shipingYes,
                street:this.state.street,
                house:this.state.house,
                flat:this.state.flat,
                town:this.state.town,
                postcode:this.state.postcode
            }).then(res => {
                if(res.status===201){
                    
                    this.props.setuserAdress({userID:this.props.userID,
                        shipingYes:this.state.shipingYes,
                        street:this.state.street,
                        house:this.state.house,
                        flat:this.state.flat,
                        town:this.state.town,
                        postcode:this.state.postcode
                    })
                }
                else{
                    this.setState({isError:true});
                    console.log(`error code : &{res.status}`);
                }
            }).catch(err => {
                console.log(err);
                this.setState({isError:true});
            });
            
            axios.put('/users/userUpdate',{email:this.props.user.email,
                password:this.props.user.password,
                userID:this.props.user.userID,
                userName:this.state.userName,
                telefon:this.state.telefon,
                boss:this.state.boss
            }).then(res => {
                if(res.status===200){
                    this.setState({redirecttoHome:true});
                    this.props.setUser(res.data);
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
        else{
            axios.put('/users/userAdress',{userID:this.props.user.userID,
                shipingYes:this.state.shipingYes,
                street:this.state.street,
                house:this.state.house,
                flat:this.state.flat,
                town:this.state.town,
                postcode:this.state.postcode
            }).then(res => {
                if(res.status===201){
                    
                    this.props.setuserAdress({userID:this.props.userID,
                        shipingYes:this.state.shipingYes,
                        street:this.state.street,
                        house:this.state.house,
                        flat:this.state.flat,
                        town:this.state.town,
                        postcode:this.state.postcode
                    })
                }
                else{
                    this.setState({isError:true});
                    console.log(`error code : &{res.status}`);
                }
            }).catch(err => {
                console.log(err);
                this.setState({isError:true});
            });
            
            axios.put('/users/userUpdate',{email:this.props.user.email,
                password:this.props.user.password,
                userID:this.props.user.userID,
                userName:this.state.userName,
                telefon:this.state.telefon,
                boss:this.state.boss
            }).then(res => {
                if(res.status===200){
                    this.setState({redirecttoHome:true});
                    this.props.setUser(res.data);
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
        
    }   
    goToHome = () =>{
        this.setState({redirecttoHome:true});
    }
    render() {
        const disabled = !this.state.userName || !this.state.telefon || !this.state.street || !this.state.house || !this.state.town || !this.state.postcode;      
        if(this.state.redirecttoHome){
            return <Redirect to = '/' />
        }  

        return (

            <div>
                <br/><br/>
                <input className="InputRegisDetails" style={{width:'350px'}} onChange = {evt => this.setState({telefon:evt.target.value})} type = 'text' value={this.state.telefon} placeholder=" &ensp; &ensp;  &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp;  &ensp; &ensp; &ensp; טלפון"/> 
                <input className="InputRegisDetails" style={{width:'350px'}} onChange = {evt => this.setState({userName:evt.target.value})} type = 'text' value={this.state.userName} placeholder=" &ensp; &ensp; &ensp; &ensp; &ensp;  &ensp; &ensp; &ensp; שם פרטי ושם משפחה"   /> 
                <br/><br/><br/> 
                <h2>כתובת</h2>   
                <input className="InputRegisDetails" style={{width:'150px'}} onChange = {evt => this.setState({flat:evt.target.value})} type = 'number' value={this.state.flat} placeholder=" &ensp; &ensp;&ensp;&ensp; &ensp; דירה   "   /> 
                <input className="InputRegisDetails" style={{width:'150px'}} onChange = {evt => this.setState({house:evt.target.value})} type = 'number' value={this.state.house} placeholder=" &ensp; &ensp;&ensp; &ensp;    בית"/> 
                <input className="InputRegisDetails" style={{width:'350px'}} onChange = {evt => this.setState({street:evt.target.value})} type = 'text' value={this.state.street} placeholder=" &ensp; &ensp; &ensp; &ensp; &ensp;  &ensp; &ensp; &ensp; &ensp; &ensp;  &ensp; &ensp; &ensp; רחוב"   /> 
                <br/><br/>
                <input className="InputRegisDetails" style={{width:'150px'}} onChange = {evt => this.setState({postcode:evt.target.value})} type = 'number' value={this.state.postcode} placeholder=" &ensp; &ensp; &ensp;&ensp;  מיקוד "   /> 
                <input className="InputRegisDetails" style={{width:'350px'}} onChange = {evt => this.setState({town:evt.target.value})} type = 'text' value={this.state.town} placeholder=" &ensp; &ensp;  &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp;  &ensp; &ensp; &ensp; עיר"/> 
                <br/><br/><br/> <br/>
                {/* <Button  variant="outline-info"  disabled={disabled} onClick = {this.registerDetails}>{this.state.buttonName}</Button> */}
                <Button  variant="outline-info"  onClick = {this.registerDetails}>{this.state.buttonName}</Button>

                <Button  variant="outline-info" className="Buttons" onClick = {this.goToHome}> חזור</Button>
            </div>
        );
    }            
};

export default RegisterDetails;
