import React, { Component } from 'react'
import Slider from 'react-slick'
import { Typography } from "../../../components/Wrappers"
import './style.css'
import axios from 'axios';
import {Select,Button} from 'evergreen-ui'
export class Slidecategories extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             data:[] ,
             topic:''

        }
    }
    handletopicchange= (event)=>{
        this.setState({
            topic:event.target.value
        })
        console.log("state of topic",this.state.topic)

    }
    componentDidMount(){
        console.log("state of topic",this.state.topic)

        axios.get(`http://localhost:8080/users/produits/${this.state.topic}`)
        .then(response => {
         console.log(response)
         console.log(response.data[0].image)
         this.setState({data: response.data})
   
     })
     .catch(error =>{
         console.log(error)
     })
   

    }
    
    handleSubmit=(event)=>{
      alert(this.state.topic)
        axios.get(`http://localhost:8080/users/produits/${this.state.topic}`)
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
        var settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            initialSlide: 0,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  infinite: true,
                  dots: true
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  initialSlide: 2
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]
          };
        return (
           
            <div>
                <div align="center"><form onSubmit={this.handleSubmit}><Select value={this.state.topic} onChange={this.handletopicchange}>
                        <option value="Shirts">Shirts</option>
                        <option value="jeans">jeans</option>
                        <option value="Sneakers">Sneakers</option>
                      
                    </Select>
                    <Button marginRight={12} iconBefore="search">Search</Button>
                    </form></div> 
                  <br></br>
                  
        <Slider {...settings}>
        {this.state.data.map(({ id, name, price,categories ,image}) => (
             <div className="forja_media_card2" style={{ height : '340px' }} key={id}>
          
             <div className="forja_media_card2-image">
             <img className="img" src={`http://localhost/Images/${image.name}`} style={{ width: '50%', maxHeight: '150px' }} />
             </div>
             <div className="forja_media_card2-details">
             <div className="forja_media_card2-context-label">  <span>NAME : {name}</span></div>
        <div className="forja_media_card2-context-label">  <span>PRIX : {price}</span></div>
             </div>
   
             </div>
         
        ))}
       
        </Slider>
            </div>
        )
    }
}

export default Slidecategories
