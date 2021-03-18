import React, { Component } from 'react'
import { RingChart } from "@opd/g2plot-react";
import axios from 'axios';

export class ChartPrice extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             dataa: []
        }
    }
    componentDidMount(){
        axios.get(`http://localhost:8080/users/produits/state/price`)
        .then(response => {
         console.log(response)
         console.log(response.data[0].image)
         this.setState({dataa: response.data})
         console.log("notree dataa ", this.state.dataa)
    
     })
     .catch(error =>{
         console.log(error)
     })
    }

    render() {
        const data = this.state.dataa

        
                
          const config = {
            forceFit: true,
            title: {
              visible: false,
              text: "RingChart"
            },
            description: {
              visible: false,
              text: "Prix"
            },
            radius: 0.9,
            padding: "auto",
            data,
            angleField: "count",
            colorField: "interval",
          
            statistic: {
              visible: true
            }
          };
        return (
            <div>
                <RingChart {...config} />
            </div>
        )
    }
}

export default ChartPrice
