import React, { Component } from 'react'
import Select from 'react-select';

const options = [
  { value: 'shops', label: 'Shops' },
  { value: 'bars', label: 'Bars' },
  { value: 'restaurants', label: 'Restaurants' }
];

export default class MapPlaceSelect extends Component {

  state = {
    selectedOption: null,
  };

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  render() {
    const { selectedOption } = this.state;
    return (
      <Select
        className="typeSelect basic-multi-select"
        isMulti
        name="types"
        classNamePrefix="select"
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
      />
    );
  }
}
