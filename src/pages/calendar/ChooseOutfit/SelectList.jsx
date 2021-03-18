import React from 'react'
import { DataContext } from './DataContext.jsx'
import axios from 'axios'
import Category from './Category.jsx'
import Item from './Item.jsx'

class SelectList extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      data:[] ,
      items:[],
      categories:[],
    }
  }

componentDidMount(){
 try {
   axios.get(`http://localhost:8080/products/user/` + localStorage.getItem('id_token'))
     .then(rep => {
       console.log(rep);
      // console.log(rep.data[0].categories[0].name);
       this.setState({ data: rep.data });
       this.setState({ items: rep.data });
     })
 }catch (e) {
   console.log(e)
 }

  try {
    axios.get(`http://localhost:8080/products/categories/` + localStorage.getItem('id_token'))
      .then(rep => {
        console.log(rep);
        // console.log(rep.data[0].categories[0].name);
        this.setState({ categories: rep.data });

      })
  }catch (e) {
    console.log(e)
  }
}
render() {

  return (
      <DataContext.Consumer>
        {context => (
            <div>
              {this.state.categories.map(category => {
                return (
                    <div key={category}>
                      <Category title={category.toUpperCase()}>
                        {this.state.items.map(item => {
                          if (category.toLowerCase() === item.categories[0].name.toLowerCase()) {
                            return (
                                <Item
                                    key={item._id}
                                    onIconClick={() => {
                                      context.addSelected(item)
                                    }}
                                >
                                  <img src={`http://localhost:81/Images/Images/${item.image.name}`} style={{ width: '50%', maxHeight: '150px' }} />
                                </Item>
                            )
                          } else {
                            return null
                          }
                        })}

                      </Category>
                    </div>

                )

              })}
            </div>
        )}
      </DataContext.Consumer>
  )

}
}

export default SelectList
