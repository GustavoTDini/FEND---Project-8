import React, { Component } from 'react';
import MapPlaceSelect from './MapPlaceSelect';
import MapPlaceList from './MapPlaceList';
import PropTypes from 'prop-types';


export default class MapNavDrawer extends Component {
  static propTypes = {
    places: PropTypes.array,
    query: PropTypes.string,
    updateQuery: PropTypes.func,
    categoriesSelect: PropTypes.func,
    updateMap: PropTypes.func,
    hoverHighlightInOut: PropTypes.func,
    selectOneMarker: PropTypes.func
  };

  changeQuery(e) {
    this.props.updateQuery(e);
  }

  doSearch(e){
    this.props.updateMap();
  }

  onHoverListInOut(ev, index, trueFalse){
    this.props.hoverHighlightInOut(ev, index, trueFalse);
  }

  onClickList(ev, index){
    this.props.selectOneMarker(ev, index);
  }

  render() {
    const {places, query} = this.props;

    return (
      <div className="drawer">
        <div className="search">
          <input
            className="input"
            type='text'
            placeholder="Search terms"
            value={query}
            onChange={(event) => this.changeQuery(event.target.value)}/>
          <MapPlaceSelect
            className="typeSelect"
            categoriesSelect={this.props.categoriesSelect}/>
          <button
            className="input"
            onClick={(e) => this.doSearch(e)}>Search</button>
        </div>
        <div className="resultList">
        {places.map((place) =>
            <li key={place.id}
                className={(place.highlight? 'resultPlaceHighlight' : 'resultPlace')}
                onClick={(e) => this.onClickList(e, place.index)}
                onMouseOver={(e) => this.onHoverListInOut(e, place.index, true)}
                onMouseOut={(e) => this.onHoverListInOut(e, place.index, false)}>
              <MapPlaceList place={place}/>
            </li>
          )}
        </div>
      </div>
    )
  }
}
