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

export function populateMarkers(places, map) {
  let markers = [];
  let largeInfowindow = new window.google.maps.InfoWindow();
  for (var i = 0; i < places.length; i++) {
    var marker = new window.google.maps.Marker({
      map: map,
      position: places[i].location,
      title: places[i].title,
      animation: window.google.maps.Animation.DROP,
      id: places[i].id
    });
    marker.addListener('click', function() {
      populateInfoWindow(this, map, largeInfowindow);
    });
    markers.push(marker);
  }
  return markers;
}

export function highlightMarkers(markers, index, trueFalse) {
  let highlightedIcon = makeMarkerIcon('0091ff');
  let defaulticon = makeMarkerIcon('FFFF24');
  for (let i =0; i< markers.length; i++){
    if (i === index && trueFalse){
      markers[i].setIcon(highlightedIcon);
    } else {
      markers[i].setIcon(defaulticon);
    }
  }
  return markers;
}

// This function takes in a COLOR, and then creates a new marker
// icon of that color. The icon will be 21 px wide by 34 high, have an origin
// of 0, 0 and be anchored at 10, 34).
function makeMarkerIcon(markerColor) {
  var markerImage = new window.google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
    '|40|_|%E2%80%A2',
    new window.google.maps.Size(21, 34),
    new window.google.maps.Point(0, 0),
    new window.google.maps.Point(10, 34),
    new window.google.maps.Size(21,34));
  return markerImage;
}

function populateInfoWindow(marker, map, infowindow) {
  // Check to make sure the infowindow is not already opened on this marker.
  if (infowindow.marker !== marker) {
    infowindow.marker = marker;
    infowindow.setContent('<div>' + marker.title + '</div>');
    infowindow.open(map, marker);
    // Make sure the marker property is cleared if the infowindow is closed.
    infowindow.addListener('closeclick', function() {
      infowindow.marker = null;
    });
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
