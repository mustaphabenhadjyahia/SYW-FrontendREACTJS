import React, { Component } from 'react'
import './style.css'
import axios from 'axios';
import { Button } from '@material-ui/core';
export class ProfileBoutique extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       data:[],
       b:'',
       nom:'',
       prenom:'',
       imgmanager:'',
       logoboutique:''
    }
  }
  componentDidMount(){
    axios.get(`http://localhost:8080/managers/${localStorage.getItem('a')}`)
    .then(response => {
     console.log(response.data)
   
     this.setState({data: response.data,
    b:response.data[0].Boutique,
  nom:response.data[0].nom,
prenom:response.data[0].prenom,
imgmanager:response.data[0].imgmanager,
logoboutique:response.data[0].logoboutique})
     console.log("notree data ",this.state.b)

 })
 .catch(error =>{
     console.log(error)
 })
  }
  handlelogoChange= (event)=>{
    this.setState({
      logoboutique:event.target.value.substring(12, 50)
    })
console.log("imageee novvvv",this.state.logoboutique)
}

handleprofilChange= (event)=>{
  this.setState({
    imgmanager:event.target.value.substring(12, 50)
  })
console.log("imageee novvvv",this.state.imgmanager)
}
handleSubmit=(event)=>{
  axios.get(`http://localhost:8080/managers/modiflogo/${localStorage.getItem('a')}/${this.state.logoboutique}`)
  .then(response => {
   console.log(response.data)
 
   this.setState({data: response.data,
  b:response.data[0].Boutique,
nom:response.data[0].nom,
prenom:response.data[0].prenom,
imgmanager:response.data[0].imgmanager,
logoboutique:response.data[0].logoboutique})
   console.log("notree data ",this.state.b)

})
.catch(error =>{
   console.log(error)
})
  
  }

  handleSubmit1=(event)=>{
    axios.get(`http://localhost:8080/managers/modifprofil/${localStorage.getItem('a')}/${this.state.imgmanager}`)
    .then(response => {
     console.log(response.data)
   
     this.setState({data: response.data,
    b:response.data[0].Boutique,
  nom:response.data[0].nom,
  prenom:response.data[0].prenom,
  imgmanager:response.data[0].imgmanager,
  logoboutique:response.data[0].logoboutique})
     console.log("notree data ",this.state.b)
  
  })
  .catch(error =>{
     console.log(error)
  })
    
    }
  
    render() {
      var manager= this.state.data ;
     
        return (
            <div>
                <div className="container">
	<div className="row">
		
        
        
       <div className="col-md-7 ">

<div className="panel panel-default">
  <div className="panel-heading">  <h4 >Profile du manager de la boutique</h4></div>
   <div className="panel-body">
       
    <div className="box box-info">
        
            <div className="box-body"></div>
                <div className="col-sm-6">
               <div  align="center"> <img alt="User Pic" src={`http://localhost/Images/${this.state.imgmanager}`} id="profile-image1" className="img-circle img-responsive"></img> 
                <div>photo du profil</div>
               <form onSubmit={this.handleSubmit1}> <input id="profile-image-upload"  type="file"  onChange={this.handleprofilChange}/>
<div><Button type="submit">modifier</Button></div></form>   
                
           
              
   
                
                
                     
                     
                    </div> 
                    


                  <br></br>
    
  
  </div>
  <div  align="center"> <img alt="User Pic"src={`http://localhost/Images/${this.state.logoboutique}`} id="profile-image1" className="img-circle img-responsive"></img> 
         <div>Logo boutique</div>  <form onSubmit={this.handleSubmit}> <input id="profile-image-upload"  type="file"  onChange={this.handlelogoChange}/>
<div><Button type="submit">modifier</Button></div></form>     
               
                
           
              
   
                
                
                     
                     
                    </div>  
                    <br></br> <br></br>
  <div className="clearfix"></div>
                    
                <div className="col-sm-5 col-xs-6 tital " >Nom:</div><div className="col-sm-7 col-xs-6 ">{this.state.nom}</div>
     <div className="clearfix"></div>
<div className="bot-border"></div>

                <div className="col-sm-5 col-xs-6 tital " >Prenom:</div><div className="col-sm-7"> {this.state.prenom}</div>
  <div className="clearfix"></div>
<div className="bot-border"></div>









                <div className="col-sm-5 col-xs-6 tital " >Boutique:</div><div className="col-sm-7">{this.state.b}</div>

 <div className="clearfix"></div>
<div className="bot-border"></div>



                    
                     </div> </div></div></div></div>
                     <script>
            
              </script> 
       
                     
                     </div></div>
           
        )
    }
}

export default ProfileBoutique
