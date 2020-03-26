import React from 'react'
import './Regions.scss'

class Regions extends React.Component {

  constructor(props) {
    super(props)
    this.selectRegion = this.selectRegion.bind(this)
  }

  selectRegion(e) {
    this.props.onChange({ 
      name: e.target.value,
      isChecked: e.target.checked
    });
  }

  renderRegions = () => {
    return this.props.regions.map( (region, key) => {
      return (
        <div className="input-group" key={key} >
          <input 
            type="checkbox" 
            name={region.name} 
            value={region.name}  
            id={region.name} 
            onChange={this.selectRegion}
            checked={region.isChecked}
          />
          <label htmlFor={region.name} >{region.name}</label>
        </div>
      )
    })
  }


  render() {
    return (
      <div className="regions"> 
        {this.renderRegions()}
      </div>
    )

  }

}

export default Regions