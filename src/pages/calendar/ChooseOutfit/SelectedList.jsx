import React from 'react'
import { DataContext } from './DataContext.jsx'
import Item from './Item.jsx'

class SelectedList extends React.Component {
  state = {
    items: [],
  }

  componentDidUpdate(prevProps) {
    if (prevProps.items !== this.props.items) {
      this.setState({ items: this.props.items })
    }
  }

  render() {
    return (
      <DataContext.Consumer>
        {context => (
          <div className="react-awesome-selector-selected-list">
            <span className="react-awesome-selector-selected-list-title">
              {this.props.title}
            </span>
            {this.state.items.map(item => {
              return (
                <Item
                  key={item._id}
                  selected
                  onIconClick={() => {
                    context.removeSelected(item)
                  }}
                >

                  <img src={`http://localhost:81/Images/Images/${item.image.name}`} style={{ width: '50%', maxHeight: '150px' }} />
                </Item>
              )
            })}
          </div>
        )}
      </DataContext.Consumer>
    )
  }
}

export default SelectedList
