import React, { Component } from 'react';
import axios from "axios";
import HomePage from './HomePage.jpg'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Redirect} from 'react-router-dom';

class Categoriot extends Component {
    state={categoriot:[],items:[],navigateToItems:false,newFileName:'',isError:false,redirecttoHome:false,categoriName:''};

    componentWillMount() {
        this.setState({ categoriot: this.props.categoriot });
    };
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
    handleCheckboxChange = (index,e) => {
        var checkedConst;
        
        checkedConst  = this.state.categoriot[index];
        checkedConst.description= e.target.value;
        this.state.categoriot[index]={...checkedConst};
        this.setState({newFileName: 'checkedConst'  });
    };
    updateCategori = (index) =>{
        this.setState({isError:false});
    
        axios.put('/categoriot',{categoriot:this.state.categoriot[index].categoriot,
            description:this.state.categoriot[index].description
        }).then(res => {
            if(res.status===200){
                var checkedConst;
        
                checkedConst  = this.state.categoriot[index];
                checkedConst=res.data;
                this.state.categoriot[index]={...checkedConst};
                this.setState({newFileName: 'checkedConst'  });                
                this.props.setCategoriot(this.state.categoriot);
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
    addCategori = () =>{
        this.setState({isError:false});
    
        axios.post('/categoriot',{description:this.state.categoriName
        }).then(res => {
            if(res.status===201 ){
                
                this.setState({newFileName:'add'});
                this.setState({categoriot: [...this.state.categoriot, res.data]});                
                this.props.setCategoriot(this.state.categoriot);
                this.setState({categoriName:''});
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
        if(this.state.navigateToItems){
            return <Redirect to = '/ItemsUpdate' />
        } 
        if(this.state.redirecttoHome){
            return <Redirect to = '/' />
        }                  
        const categoriot = this.state.categoriot.map((item,index) => (
            <div key={index}>
               <Button  variant="outline-info" className="Buttons"  onClick ={() => this.updateCategori(index)} > עדכון </Button>                 
                <input key={index} style={{width:'150px',textAlign: 'right'}} onChange={this.handleCheckboxChange.bind(this, index)} type = 'text' onDoubleClick ={() => this.getItems(item.categoriot,item.description)} value={item.description}   placeholder=" &ensp; &ensp;  &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp;  &ensp; &ensp; &ensp; קטגוריה"/> 
             </div>
        ))  
        
        return (
            <div className = "Homediv">  
       
                <br></br>
                <div >
                    <h4>קטגוריות</h4>
                    {categoriot}
                </div>
                <br></br>
                <Button  variant="outline-info" className="Buttons" onClick = {this.goToHome}> חזור</Button>
                <Button  variant="outline-info" className="Buttons"  onClick = {this.addCategori}> הוספת קטגוריה</Button> 
                <input style={{width:'150px',textAlign: 'right'}} onChange = {evt => this.setState({categoriName:evt.target.value})} type = 'text' onDoubleClick = {this.addCategori} value={this.state.categoriName}   placeholder=" &ensp; &ensp;  &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp;  &ensp; &ensp; &ensp; קטגוריה"/> 

            </div>
        );
    }
}

export default Categoriot;