import React, { Component } from 'react'
import Widget from "../../components/Widget/Widget"
import Table from "./components/Table/Table";
import Slidecategories from "./components/Slidecategories"
import Slidedate from "./components/Slidedate"
import axios from 'axios';

import {
    Grid,
    LinearProgress,
    Select,
    OutlinedInput,
    MenuItem,
  } from "@material-ui/core";
import Chartcart from '../messtat/Chartcart';
import ChartColors from '../messtat/ChartColors';
import ChartPrice from '../messtat/ChartPrice';
import ChartDate from '../messtat/ChartDate';
import Calendar from './Calendar';
import ProfileBoutique from '../ProfilePage/ProfileBoutique';




export class mesvente extends Component {
    constructor(props) {
        super(props) 
      
        this.state = {
           data :[],
           
        }
      }
      componentDidMount(){
      
       console.log(localStorage.getItem('a'))
        axios.get("http://localhost:8080/users/produits")
        .then(response => {
         console.log(response)
         console.log(response.data[0].image)
         this.setState({data: response.data})
   
     })
     .catch(error =>{
         console.log(error)
     })
   
     
      }
    render() {
        return (
            <div>
              
                <Grid item xs={12}>
          <Widget
            title="mes ventes en ligne "
            upperTitle
            noBodyPadding
            //bodyClass={classes.tableWidget}
          >
    <Table data={this.state.data}/>
          </Widget>
         
        </Grid>
        
         
            </div>
        )
    }
}

export default mesvente
