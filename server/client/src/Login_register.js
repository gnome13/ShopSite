import React, { Component } from "react";
import axios from "axios";
import {Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

class Login_register extends Component {
    state = { email:'', password:'',redirecttoHome:false,isError:false,redirecttoDetails:false};
    
    login = () =>{
        this.setState({isError:false});
        axios.post('/users/login',{email:this.state.email,password:this.state.password
        }).then(res => {
            //res.data is user
            if(res.status===200){
                this.setState({redirecttoHome:true})
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
    register = () =>{
        this.setState({isError:false});
        axios.post('/users/register',{email:this.state.email,password:this.state.password
        }).then(res => {
            if(res.status===201){
                this.setState({redirecttoDetails:true})
                this.props.setUser(res.data)
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
    
    onSelect= (e) =>{

        if (e==='link-1') { this.props.setNewUser(true)}
        else {  this.props.setNewUser(false)  }        

    }
 
    render() {
        const disabled = !this.state.email || !this.state.password;
        let activeTab= '';
        if(this.props.newuser){ activeTab= 'link-1'
        }
        else{activeTab= 'link-2'}  ;
        if(this.state.redirecttoHome){
            return <Redirect to = '/' />
        } 
        if(this.state.redirecttoDetails){
            return <Redirect to = '/RegisterDetails' />
        }         
               
        return (

            <div>
               <Nav variant="tabs" className="justify-content-center" defaultActiveKey={activeTab} onSelect={this.onSelect}>
                    <Nav.Item>
                        <Nav.Link eventKey="link-1">הירשם</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-2">רישום</Nav.Link>
                    </Nav.Item>
                </Nav>   
                <br/><br/>                      
                 <input style={{width:'350px'}} onChange = {evt => this.setState({email:evt.target.value})} type = 'email' placeholder=" &ensp; &ensp; &ensp; &ensp; &ensp;  &ensp; &ensp; &ensp; &ensp; &ensp;  &ensp; &ensp; &ensp; מאיל"   /> 
                <br/><br/>
                 <input style={{width:'350px'}} onChange = {evt => this.setState({password:evt.target.value})} type = 'password' placeholder=" &ensp; &ensp;  &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp;  &ensp; &ensp; &ensp; סיסמה"/> 
                <br/><br/><br/>
                {this.state.isError ? <p style={{color:'red'}}>Login Error</p> : ""}
                {this.props.newuser ? <Button  variant="outline-dark"  disabled={disabled} onClick = {this.register}>הירשם</Button> : <Button  variant="outline-dark" disabled={disabled}  onClick = {this.login}>רישום</Button>}                
                
            </div>
        );
    }            
};

export default Login_register;