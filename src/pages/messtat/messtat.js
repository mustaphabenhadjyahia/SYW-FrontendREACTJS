import React, { Component } from 'react'
import {
  Grid,
  LinearProgress,

  OutlinedInput,
  MenuItem,
  Typography,
} from "@material-ui/core";

import Popup from "reactjs-popup";
import {Select,Button,Dialog,Pane} from 'evergreen-ui'
import Widget from "../../components/Widget/Widget"
import Chartcart from "./Chartcart"
import ChartColors from "./ChartColors"
import ChartDate from "./ChartDate"
import ChartPrice from "./ChartPrice"
import Slidetop from "./Slidetop"
import axios from 'axios';
import "./style.css"


export class messtat extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       ch1:'',
       ch2:'',
       ch3:'',
       data: []

    }
  }
  handlech1= (event)=>{
    this.setState({
        
        ch1:event.target.value
    })
    console.log("state of topic",this.state.ch1)

}
handlech2= (event)=>{
  this.setState({
      
      ch2:event.target.value
  })
  console.log("state of topic",this.state.ch2)

}
handlech3= (event)=>{
  this.setState({
      
      ch3:event.target.value
  })
  console.log("state of topic",this.state.ch3)

}
handleSubmit=(event)=>{
  console.log(this.state.ch1)
  console.log(this.state.ch2)
  console.log(this.state.ch3)
  
  axios.get(`http://localhost:8080/users/scoree/${this.state.ch1}/${this.state.ch2}/${this.state.ch3}`)
  .then(response => {
  // console.log(response)
   console.log(response.data)
   this.setState({data: response.data})

})
.catch(error =>{
   console.log(error)
})

  }
  
    render() {
        return (
            <div>
                 <Grid container spacing={4}>
                   <Grid item lg={4} md={4} sm={6} xs={12}>
                   <Widget
                   title="Statistique par rapport aux categories "
                   upperTitle
                   noBodyPadding
                   //bodyClass={classes.tableWidget}
                 >
                  <Chartcart/>
                   
                 </Widget>
                   </Grid>

                   
                   <Grid item xs={4}  spacing={4}>
                 <Widget
                   title="Prediction des top 3 produits"
                   upperTitle
                   noBodyPadding
                   style={{  maxHeight: '10px' }}
                   //bodyClass={classes.tableWidget}
                  
                 >
                   <br></br><br/>
                     <div align="center"><form onSubmit={this.handleSubmit}>
                     <Typography color="primary" >
                     choisir le  critère numéro 1 :
        </Typography>
                     < Select  width = " 80% "  value={this.state.ch1} onChange={this.handlech1} > 
  < option  value = "cat"   > categories </ option > 
  < option  value = "prix" > Prix </ option > 
  < option  value = "color" > couleurs </ option > 
</ Select > <br/><br></br><br></br>
<Typography color="primary" >
                     choisir le  critère numéro 2 :
        </Typography>
< Select  width = "80%"   value={this.state.ch2} onChange={this.handlech2}> 
< option  value = "cat"   > categories </ option > 
  < option  value = "prix" > Prix </ option > 
  < option  value = "color" > couleurs </ option > 
</ Select >
<br/><br></br><br></br>

<Typography color="primary" >
                     choisir le  critère numéro 3:
        </Typography>
< Select  width = " 80% " value={this.state.ch3} onChange={this.handlech3} > 
< option  value = "cat"   > categories </ option > 
  < option  value = "prix" > Prix </ option > 
  < option  value = "color" > couleurs </ option > 
</ Select > 
<br/><br></br><br></br>


<Popup
    trigger={<Button marginRight={12} iconBefore="search">Rechercher</Button>}
    modal
    closeOnDocumentClick
  > 
    {close => (
      <div className="modal">
        <a className="close" onClick={close}>
          &times;
        </a>
        <div className="header"> Top 3 produit suggerer </div>
        <div className="content">
          {" "}
        <Slidetop data={this.state.data}/>
        </div>
      
      </div>
    )}
  
  </Popup>
                    
                    </form></div> 
              
                   
                   
                 </Widget>
                
               </Grid>
               <Grid item xs={4} spacing={4}>
                 <Widget
                   title="Statistique par  rapport aux couleurs "
                   upperTitle
                   noBodyPadding
                   //bodyClass={classes.tableWidget}
                 >
                   <ChartColors/>
                   
                   
                 </Widget>
                
               </Grid>

              
               <Grid item xs={6} spacing={4}>
                 <Widget
                   title="Statistique par rapport aux prix "
                   upperTitle
                   noBodyPadding
                   //bodyClass={classes.tableWidget}
                 ><br></br>
                   <ChartPrice/>
                 </Widget>
                
               </Grid>  
               <Grid item xs={6} spacing={4}>
                 <Widget
                   title="Statistque par rapport aux dates  "
                   upperTitle
                   noBodyPadding
                   //bodyClass={classes.tableWidget}
                 >
                   <ChartDate/>
                   
                 </Widget>
                
               </Grid>  
               
               </Grid>
            </div>
        )
    }
}

export default messtat
