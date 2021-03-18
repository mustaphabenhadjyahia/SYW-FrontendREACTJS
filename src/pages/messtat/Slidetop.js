import React from 'react'
import Slider from 'react-slick'

import './style.css'
import axios from 'axios';
import {Select,Button} from 'evergreen-ui'

export default function Slidetop({data}) {
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
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
                   <Slider {...settings}>
        {data.map(({ _id, name, prix,categories,size ,image,color}) => (
             <div className="forja_media_card2" style={{ height : '340px' }} key={_id}>
          
             <div className="forja_media_card2-image">
             <img className="img" src={`http://localhost/Images/${image}`} style={{ width: '50%', maxHeight: '150px' }} />
             </div>
             <br></br><br></br>
             <div className="forja_media_card2-details">
             <div className="forja_media_card2-context-label">  <span>NOM : {name}</span></div>
             <div className="forja_media_card2-context-label">  <span>COULEUR: {color}</span></div>
             <div className="forja_media_card2-context-label">  <span>Categories : {categories}</span></div>
             <div className="forja_media_card2-context-label">  <span>TAILLE : {size}</span></div>
        <div className="forja_media_card2-context-label">  <span>PRIX : {prix}</span></div>
             </div>
   
             </div>
         
        ))}
       
        </Slider>
        </div>
    )
}
