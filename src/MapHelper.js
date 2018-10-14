const ApiKey = 'AIzaSyDEPrsQgonZwOz6P7dJBR0ma-rlPBCeEc0';
const clientId = 'XJKO2X12JL3NMHCHQUKCYONALVPSMMFUL1L4ROMSDMJ5M35G';
const clientSecret = '230GFGABAMF15RX5FCBJI2UA0XXEJ3R5KXDN2IVYUQ1YUTVL';
const city = "Sorocaba";
const date = "20181014";
const limit = 10;

// Inicializa o Mapa
export function initMap() {
  return this.map = new window.google.maps.Map(document.getElementById('map'), {
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
  var markers = [];
  // The following group uses the location array to create an array of markers on initialize.
  for (var i = 0; i < places.length; i++) {
    // Get the position from the location array.
    var position = places[i].location;
    var title = places[i].title;
    // Create a marker per location, and put into markers array.
    var marker = new window.google.maps.Marker({
      map: map,
      position: position,
      title: title,
      animation: window.google.maps.Animation.DROP,
      id: i
    });
    // Push the marker to our array of markers.
    markers.push(marker);
  }
  return markers;
}

export const searchFourSquarePlaces = (query, categories) =>
  fetch(createSearchUrl(query, categories), {
    method: 'GET'})
    .then(res => res.json())
    .then(data => data.response.venues)
    .catch(res => console.log("error" + res.meta.code));

export function createPlacesArray(response){
  let id, title, address, lat, lng, place
  let places = [];
  for (let i=0; i < response.length; i++){
    id = response[i].id;
    title = response[i].name;
    address = response[i].location.address;
    lat = response[i].location.lat;
    lng = response[i].location.lng;
    place = {"index" : i + 1 ,"id": id, "title": title, "address": address, location: {"lat": lat, "lng": lng}};
    places.push(place);
  }
  return places;
}

export function createSearchUrl(query, categories){

  let foursquareSearchUrl = new URL(`https://api.foursquare.com/v2/venues/search?`);
  let UrlParams = new URLSearchParams(foursquareSearchUrl);
  UrlParams.append('client_id', clientId);
  UrlParams.append('client_secret', clientSecret);
  UrlParams.append('near', city);

  if (query){
    UrlParams.append('query', query);
  };
  if (categories){
    let categoriesList = categories.join(",");
    UrlParams.append('categoryId', categoriesList);
  };

  UrlParams.append('limit', limit);
  UrlParams.append('v', date);

  return(foursquareSearchUrl + UrlParams.toString());
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
