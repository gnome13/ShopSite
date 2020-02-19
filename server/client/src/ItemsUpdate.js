import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import "./ItemsUpdate.css";
import {Redirect} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

class ItemsUpdate extends Component {
    state={newFileName:'',redirecttoHome:false,items:[],isError:false,file:'',img:'',description:'',price:'',imgNew:''};

    componentWillMount() {
        this.setState({ items: this.props.items });
    }; 
    descriptionChange = (index,e) => {
        var descriptionConst;
        
        descriptionConst  = this.state.items[index];
        console.log(descriptionConst,'descriptionConst');
        descriptionConst.description= e.target.value;
        console.log(descriptionConst.description,'descriptionConst.description=');
        this.state.items[index]={...descriptionConst};
        this.setState({newFileName: 'descriptionConst'  });
        console.log(this.state.items);
    };   
    priceChange = (index,e) => {
        var priceConst;
        
        priceConst  = this.state.items[index];
        priceConst.price= e.target.value;
        this.state.items[index]={...priceConst};
        this.setState({newFileName: 'priceConst'  });
        console.log(this.state.items);
    };     
    getItem = (index) =>{
 
        this.props.setItemIndex(index);
        
    }  ;  
    updateFile = (index,evt) =>{
        this.setState({file:evt.target.files[0]});
    }  ;  
    loadToServerUpdateItem = (index,mode) =>{
        // console.log(this.state.file,'this.state.file');
        let formData = new FormData();
        formData.append('someFile',this.state.file);
        // formData.append('someFile',this.state.someText);
        const config = {headers: {'content-type':'multipart/form-data'}}
        axios.post('/api',formData,config)
        .then(res =>{
          if(res.status===201){
            
            // console.log(res.data.file.filename);
            this.setState({newFileName:res.data.file.filename});
            if(mode==='upadate'){
                var pictureConst;
            
                pictureConst  = this.state.items[index];
                pictureConst.picture= res.data.file.filename;
                this.state.items[index]={...pictureConst};
            }
            // this.setState({newFileName: 'priceConst'  });            
            axios.get(`/images/${this.state.newFileName}`,{responseType:'blob'})
            .then(res=>{
                if ( res.status===200 ) {
                    const reader = new FileReader();
                    reader.readAsDataURL(res.data);
                    const _this = this;
                    reader.onload = function(){
                        const imageDataURL = reader.result;
                        _this.setState({img:imageDataURL});
                        if(mode==='upadate'){
                            pictureConst.img= imageDataURL;
                            _this.state.items[index]={...pictureConst};
                            _this.updateItem(index);
                        }
                        else{
                            _this.addItem() ;   
                        }
                    }
                }
                else{
                    console.log(`error status code :${res.status} `)
                }
            }).catch(err=>console.log(err));
          }
          else{
            console.log(`error status code ${res.status}`);
          }
        })
        .catch(err =>console.log(err));
    
      };    
      updateItem = (index) =>{
        this.setState({isError:false});
    
        axios.put('/items',{itemID:this.state.items[index].itemID,
            categoriotID:this.state.items[index].categoriotID,
            description:this.state.items[index].description,
            picture:this.state.items[index].picture,
            price:this.state.items[index].price
        }).then(res => {
            if(res.status===200){
                var checkedConst;
        
                checkedConst  = this.state.items[index];
                checkedConst=res.data;
                this.state.items[index]={...checkedConst};
                // this.setState({newFileName: 'checkedConst'  });                
                this.props.setItems(this.state.items);
                this.getItems (this.props.categoriotIndex);

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
    addItem = () =>{
        this.setState({isError:false});
    
        axios.post('/items',{
            categoriotID:this.state.items[0].categoriotID,
            description:this.state.description,
            picture:this.state.newFileName,
            price:this.state.price
        }).then(res => {
            if(res.status===201 ){
                
                this.setState({newFileName:'add'});
                this.setState({items: [...this.state.items, res.data]});                
                this.props.setItems(this.state.items);
                this.getItems (this.props.categoriotIndex);
                this.setState({price:''});
                this.setState({description:''});
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
    getItems = (index) =>{

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
                                _this.setState({img:''});
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
    goToHome = () =>{
        this.setState({redirecttoHome:true});
    }       
    render() {
        const elements = this.state.items.map((item,index) => (
            <div key={index} >
               <Button  variant="outline-info" className="Buttons"  onClick ={() => this.loadToServerUpdateItem(index,'upadate')} > עדכון </Button>                 
                <img  src={item.img}/>
                 <div className="w-50 p-3 float-right">
                    <input style={{width:'600px',textAlign: 'right'}} onChange={this.descriptionChange.bind(this, index)} type = 'text'  value={item.description}  /> 
                </div>
                <div className="w-15 p-3 float-right">
                    ₪ <input style={{width:'50px',textAlign: 'right'}} onChange={this.priceChange.bind(this, index)} type = 'number' value={item.price}  /> מחיר 
                </div> 
                
                <div className="w-20 p-1 float-right">
                    <input type="file" name="file" id="file" className="inputfile"onChange={this.updateFile.bind(this, index)}  />
                    <label for="file" variant="outline-dark"  className="Buttons"><strong>בחר קובץ</strong></label>   
                    {/* <Button  variant="outline-dark"  className="Buttons" onClick = {() => this.loadToServer(index)}>טעינה לשרת </Button> */}
                </div> 
                <br/><br/>                  
            </div>
        ))  
        if(this.state.redirecttoHome){
            return <Redirect to = '/' />
        }          
        return (
            <div className = "Homediv">
                <br></br>
                <h2>{this.props.categoroitName}</h2>
                {elements}
                <br></br>

                <div  >
                    <Button  variant="outline-info" className="Buttons"  onClick ={() => this.loadToServerUpdateItem(100,'add')}> הוספה </Button> 
                    <img  src={this.state.imgNew}/>
                    <div className="w-50 p-3 float-right">
                        <input style={{width:'600px',textAlign: 'right'}} onChange = {evt => this.setState({description:evt.target.value})}  type = 'text'  value={this.state.description}  /> 
                    </div>
                    <div className="w-15 p-3 float-right">
                        ₪ <input style={{width:'50px',textAlign: 'right'}} onChange = {evt => this.setState({price:evt.target.value})}  type = 'number' value={this.state.price}  /> מחיר 
                    </div> 
                    
                    <div className="w-20 p-1 float-right">
                        <input type="file" name="file" id="file" className="inputfile"  onChange={this.updateFile.bind(this, 100)}  />
                        <label for="file" variant="outline-dark"  className="Buttons"><strong>בחר קובץ</strong></label>   
                    </div> 
                    <br/><br/>                  
                </div>







                <Button  variant="outline-info" className="Buttons" onClick = {this.goToHome}> חזור</Button>
                {/* <Button  variant="outline-info" className="Buttons"  onClick = {this.addCategori}> הוספת קטגוריה</Button>  */}
                {/* <input style={{width:'150px',textAlign: 'right'}} onChange = {evt => this.setState({categoriName:evt.target.value})} type = 'text' onDoubleClick = {this.addCategori} value={this.state.categoriName}   placeholder=" &ensp; &ensp;  &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp;  &ensp; &ensp; &ensp; קטגוריה"/>  */}

            </div>
        );
    }
}

export default ItemsUpdate;