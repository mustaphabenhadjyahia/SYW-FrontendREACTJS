import React, { Component } from 'react'
import { LineChart } from '@opd/g2plot-react'
import { LineConfig } from '@antv/g2plot'
import { PieChart } from '@opd/g2plot-react'
import axios from 'axios';

export class Chartcart extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       dataa: []
    }
  }
  componentDidMount(){
    
    axios.get(`http://localhost:8080/users/produits/state/cat`)
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
      const config = {
        forceFit: true,
        title: {
          visible: true,
          text: 'Pie chart',
        },
        description: {
          visible: true,
          text:
            '(categories)',
        },
        radius: 0.8,
        data:this.state.dataa,
          
        angleField: 'value',
        colorField: 'type',
        label: {
          visible: true,
          type: 'inner',
        },
      }
      
        return (
            <div>
                <PieChart {...config} />
            </div>
        )
    }
}

export default Chartcart
