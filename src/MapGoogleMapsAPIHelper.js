import React from 'react';
import InfoWindow from './InfoWindow';
import ReactDOMServer from 'react-dom/server';
import defaultIcon from './icons/MapMarkerBlue.png';
import highlightedIcon from './icons/MapMarkerPink.png';
import * as MapFourSquareAPIHelper from './MapFourSquareAPIHelper';

const ApiKey = 'AIzaSyDEPrsQgonZwOz6P7dJBR0ma-rlPBCeEc0';

// Inicializa o Mapa
export function initMap() {
  return this.map = new window.google.maps.Map(document.getElementById('map'), {
    center: {lat: -23.52973025799875, lng: -47.4653909},
    zoom: 14,
    disableDefaultUI: true,
  });

}

export function createMapScript() {
  // If we haven't already defined the promise, define it
  if (!this.googleMapsPromise) {
    this.googleMapsPromise = new Promise((resolve) => {
      // Add a global handler for when the API finishes loading
      window.resolveGoogleMapsPromise = () => {
        // Resolve the promise
        resolve(window.google);
        // Tidy up
        delete window.resolveGoogleMapsPromise;
      };

      // Load the Google Maps API
      const script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${ApiKey}&callback=resolveGoogleMapsPromise`;
      document.body.appendChild(script);
    });
  }

  // Return a promise for the Google Maps API
  return this.googleMapsPromise;
}

export function populateMarkers(places, map, closeModal) {
  let markers = [];
  let largeInfowindow = new window.google.maps.InfoWindow();
  for (var i = 0; i < places.length; i++) {
    var marker = new window.google.maps.Marker({
      map: map,
      position: places[i].location,
      title: places[i].title,
      animation: window.google.maps.Animation.DROP,
      id: places[i].id,
      icon: defaultIcon
    });
    marker.addListener('click', function() {
      populateInfoWindow(this, map, largeInfowindow, closeModal);
    });
    marker.addListener('mouseover', function() {
      this.setIcon(highlightedIcon);
    });
    marker.addListener('mouseout', function() {
      this.setIcon(defaultIcon);
    });
    markers.push(marker);
  }
  return markers;
}

export function highlightMarkers(markers, index, trueFalse) {
  for (let i =0; i< markers.length; i++){
    if (i === index && trueFalse){
      markers[i].setIcon(highlightedIcon);
    } else {
      markers[i].setIcon(defaultIcon);
    }
  }
  return markers;
}

function populateInfoWindow(marker, map, infowindow, closeModal) {
  let infoContent;
  // Check to make sure the infowindow is not already opened on this marker.
  if (infowindow.marker !== marker) {
    MapFourSquareAPIHelper.getFourSquareDetails(marker.id).then((responseVenue) => {
      console.log(responseVenue);
      if(responseVenue.meta.code === 200){
        let venueObject = MapFourSquareAPIHelper.getVenueDetails(responseVenue.response.venue);
        infoContent = ReactDOMServer.renderToString(<InfoWindow venue={venueObject} response={'ok'}/>);
      } else{
        let code = responseVenue.meta.code.toString();
        infoContent = ReactDOMServer.renderToString(<InfoWindow error={code} response={'error'}/>);
      }
      infowindow.marker = marker;
      infowindow.setContent(infoContent);
      infowindow.open(map, marker);
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick', function() {
        infowindow.marker = null;
      });
      window.google.maps.event.addListener(map, "click", function(event) {
        infowindow.close();
      });
    })
  }
}

export function mapBoundaries(map, markers) {
  var bounds = new window.google.maps.LatLngBounds();
  // Extend the boundaries of the map for each marker and display the marker
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
    bounds.extend(markers[i].position);
  }
  map.fitBounds(bounds);
}
