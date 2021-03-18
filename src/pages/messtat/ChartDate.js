import React, { Component } from 'react'
import { LineChart } from '@opd/g2plot-react'
import axios from 'axios';
export class ChartDate extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             dataa:[]
        }
    }
    componentDidMount(){
        axios.get(`http://localhost:8080/users/produits/state/date`)
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
        
          const config1 = {
            title: {
              visible: true,
              text: "LineChart"
            },
            description: {
              visible: true,
              text: "(date)"
            },
            padding: "auto",
            forceFit: true,
            data: this.state.dataa,
            xField: "datee",
            yField: "nbr de produit vendue",
            
            legend: {
              position: "right-top"
            },
            
            responsive: true
          };
        return (
            <div>
                  <LineChart {...config1} />
            </div>
        )
    }
}

export default ChartDate
