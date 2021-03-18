import React, { Component } from 'react'

import {
    Grid,
    LinearProgress,
    Select,
    OutlinedInput,
    MenuItem,
  } from "@material-ui/core";
  import Widget from "../../components/Widget/Widget"
  import Table from "./components/Table/Table";
  import Slidecategories from "./components/Slidecategories"
  import Slidedate from "./components/Slidedate"
import axios from 'axios';
 class mesarticles extends Component {
   
   
    render() {
        return (
            <div>
               <Grid container spacing={4}>
               
        <Grid item xs={8} spacing={4}>
          <Widget
            title="mes ventes par categorie "
            upperTitle
            noBodyPadding
            //bodyClass={classes.tableWidget}
          >
            <Slidecategories/>
            
          </Widget>
         
        </Grid>
        <Grid item xs={8} spacing={4}>
          <Widget
            title="mes ventes par date "
            upperTitle
            noBodyPadding
            //bodyClass={classes.tableWidget}
          ><Slidedate></Slidedate>
            
          </Widget>
         
        </Grid>
               </Grid>
               
                
        
            </div>
        )
    }
}

export default  mesarticles
