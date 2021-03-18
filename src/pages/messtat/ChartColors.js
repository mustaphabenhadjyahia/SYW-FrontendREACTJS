import React, { Component } from 'react'
import { ColumnChart } from '@opd/g2plot-react'
import axios from 'axios';
export class ChartColors extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             dataa:[]
        }
    }
    componentDidMount(){
        axios.get(`http://localhost:8080/users/produits/state/color`)
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
        const config = {title: {
            visible: true,
            text: 'ColumnChart',
          },
          description: {
            visible: true,
            text: "(Couleur)"
          },
          forceFit: true,
          data:this.state.dataa,
          padding: 'auto',
          xField: '_id',
          yField: 'count',
          meta: {
            _id: {
              alias: 'couleur',
            },
            count: {
              alias: 'nbr produit',
            },
          },
          }
        return (
            <div>
             <ColumnChart {...config} />   
            </div>
        )
    }
}

export default ChartColors
