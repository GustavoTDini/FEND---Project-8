import React, { Component } from 'react'
import Select from 'react-select';
import PropTypes from 'prop-types';

const options = [
  { value: '4bf58dd8d48988d17f941735', label:  'Cinema'},
  { value: '4d4b7104d754a06370d81259', label: 'Arte e Lazer' },
  { value: '4bf58dd8d48988d142941735', label: 'Restaurante Asiático' },
  { value: '4bf58dd8d48988d16a941735', label: 'Padaria' },
  { value: '4bf58dd8d48988d16c941735', label: 'Hamburgueria' },
  { value: '52e81612bcbc57f1066b79f4', label: 'Restaurante Self-Service' },
  { value: '4bf58dd8d48988d1e0931735', label: 'Cafeteria' },
  { value: '4bf58dd8d48988d16e941735', label: 'Fast Food' },
  { value: '52939a643cf9994f4e043a33', label: 'Churrascaria' },
  { value: '4bf58dd8d48988d1ca941735', label: 'Pizzaria' },
  { value: '4bf58dd8d48988d116941735', label: 'Bar' },
  { value: '50327c8591d4c4b30a586d5d', label: 'Cervejaria' },
  { value: '4d4b7105d754a06377d81259', label: 'Ar Livre e Recreação' },
  { value: '52f2ab2ebcbc57f1066b8b42', label: 'Hipermercado' },
  { value: '4bf58dd8d48988d1fd941735', label: 'Shopping Center' },
];

export default class MapPlaceSelect extends Component {
  static propTypes = {
    categoriesSelect: PropTypes.func
  };

  state = {
    selectedOption: null,
  };

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    this.props.categoriesSelect(selectedOption);
  };

  render() {
    const { selectedOption } = this.state;
    return (
      <Select
        className="type-select"
        isMulti
        name="types"
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
      />
    );
  }
}
