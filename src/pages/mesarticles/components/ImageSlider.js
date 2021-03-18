import React from 'react'
import { Carousel } from 'react-responsive-carousel';

function ImageSlider(props) {
    return (
        <div>

            <Carousel autoplay>
               
                    <div >
                        <img style={{ width: '100%', maxHeight: '150px' }}
                            src={`http://localhost/Images/${props.image}`} alt="productImage" />
                    </div>
               
            </Carousel>
        </div>
    )
}

export default ImageSlider
