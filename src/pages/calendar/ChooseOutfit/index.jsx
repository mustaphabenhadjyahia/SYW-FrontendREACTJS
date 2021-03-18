import React from 'react'
import { DataProvider, DataContext } from './DataContext.jsx'
import SelectList from './SelectList.jsx'
import SelectedList from './SelectedList.jsx'
import './style.scss'

export class SelectorChild extends React.Component {

  state = {
    items: [],
    categories: [],
  }

 /* componentDidMount() {
    this.sanitizeData()
  }

  sanitizeData = () => {
    let items = this.props.data
    let tempCategories = []
    let categories = []
    let m = 0
    let n = 0
    items.map(item => {
      if (!tempCategories.includes(item.categories[0].name)) {
        tempCategories.push(item.categories[0].name)
        categories.push({
          name: item.categories[0].name,
          key: m,
        })
        m++
      }
      item.key = n
      return n++
    })
    this.setState({ items, categories }, () => {
      this.props.context.initialPopulate(this.state.items)
    })
  }*/

  render() {
    const { categories } = this.state
    return (
      <div>
        <div style={{ display: 'flex' }}>
          <div>
            <SelectList
              items={this.props.context.selectList}
              categories={categories}
            />
          </div>
          <div>
            <SelectedList
              title={'Selected Outfit'}
              items={this.props.context.selectedList}
            />
          </div>
        </div>
      </div>
    )
  }
}

function Selector(props) {

  return (

        <DataProvider>
          <DataContext.Consumer>
            {context => (
              <div className="react-awesome-selector-wrapper">
                <SelectorChild
                  selectedTitle={props.selectedTitle}
                  context={context}
                  data={props.data}
                />
                <center> <button
                  className="react-awesome-selector-submit-button"
                  onClick={() => {
                    props.getSelected(context.selectedList);
                  }}
                >
                  Submit
                </button>
                </center>
              </div>
            )}
          </DataContext.Consumer>

        </DataProvider>



  )
}



Selector.defaultProps = {
  data: [],
  selectedTitle: 'Selected',
  getSelected: function(values) {
    console.log('Selected outfit: ', values);
    alert('Selected Outfit : '+ values);
  },
}

export default Selector
