import React, { Component } from 'react';
import { render } from 'react-dom';
import './App.css';
import data from './data.json';

class App extends Component {
  constructor() {
    super();
    this.state = {
      filterOption: '',
      filteredData: []
    };
  }

  optionSelected(e) {
    this.setState({
      filterOption: e.target.value
    })
  }

  renderTableData(data) {
    return data.map((element, i) => (
      <tr key={i}> 
        {/* <td>{element.Name}</td> */}
        <td>{element.Env}</td>
        <td>{element.LOB}</td> 
      </tr>
    ))
  }

  renderFilterOptions(filterOption) {
    if(filterOption) {
      let options = Array.from(new Set(data.map(element => element[filterOption])));
      return options.map((option,i) => <option key={i} value={option}> {option} </option>)
    }
    return []
  }

  filterOptionSelected(e) {
    let {value} = e.target
    if(value) {
      let { filterOption } = this.state
      let filteredData = data.filter(element => element[filterOption] === value);
      this.setState({
        filteredData: filteredData
      })
    }
  }

  render() {
    let { filterOption, filteredData } = this.state
    return (
      <div>
        <div>
          <label> Filter By </label>
          <select onChange={this.optionSelected.bind(this)}> 
            <option value="">  </option>
            <option value="Env"> Env </option>
          </select>

          <select onChange={this.filterOptionSelected.bind(this)}> 
            <option value="">  </option>
            {this.renderFilterOptions(filterOption)}
          </select>

          <label> Filter By </label>
          <select onChange={this.optionSelected.bind(this)}> 
            <option value="">  </option>
            <option value="LOB"> LOB </option>
          </select>
          
          <select onChange={this.filterOptionSelected.bind(this)}> 
            <option value="">  </option>
            {this.renderFilterOptions(filterOption)}
          </select>
        </div>
        <table border="1">
          <thead>
            <th> Env </th>
            <th> LOB </th>
          </thead>
          <tbody>
             {
               filteredData.length? this.renderTableData(filteredData) : this.renderTableData(data) 
             }
          </tbody>
        </table>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));