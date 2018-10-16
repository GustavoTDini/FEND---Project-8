const clientId = 'XJKO2X12JL3NMHCHQUKCYONALVPSMMFUL1L4ROMSDMJ5M35G';
const clientSecret = '230GFGABAMF15RX5FCBJI2UA0XXEJ3R5KXDN2IVYUQ1YUTVL';
const city = "Sorocaba";
const date = "20181014";
const limit = 20;
const radius = 15000;
const notFound = "Venues Not Found";
const defaultHighlight = false;
const defaultShow = false;

export const searchFourSquarePlaces = (query, categories) =>
  fetch(createSearchUrl(query, categories), {
    method: 'GET'})
    .then(res => res.json())
    .then(data => data.response.venues)
    .catch(res => console.log("error" + res.meta.code));

export function createSearchUrl(query, categories){

  let foursquareSearchUrl = new URL(`https://api.foursquare.com/v2/venues/search?`);
  let UrlParams = new URLSearchParams(foursquareSearchUrl);
  UrlParams.append('client_id', clientId);
  UrlParams.append('client_secret', clientSecret);
  UrlParams.append('near', city);
  UrlParams.append('radius', radius);
  UrlParams.append('intent', 'browse');

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

export function createPlacesArray(response){
  let id, title, address, lat, lng, place
  let places = [];
  let listIndex = 1;
  if (!response || response.length === 0 ){
    title = notFound;
    place = {"index" : listIndex ,
             "id": id,
             "title": title,
             "address": address,
             location: {"lat": lat, "lng": lng},
             highlight: defaultHighlight,
             selected: defaultShow};
    places.push(place);
    return places;
  } else {
    for (let i=0; i < response.length; i++){
      if(response[i].location.address){
        id = response[i].id;
        title = response[i].name;
        address = response[i].location.address;
        lat = response[i].location.lat;
        lng = response[i].location.lng;
        place = {"index" : listIndex ,
                 "id": id,
                 "title": title,
                 "address": address,
                 location: {"lat": lat, "lng": lng},
                 highlight: defaultHighlight,
                 selected: defaultShow};
        listIndex ++;
        places.push(place);
      }
    }
    return places;
  }

}

export function getPlacesDetail(venue, map){
  var location = new window.google.maps.LatLng(venue.location.lat,venue.location.lng);
  var request = {
    location: location,
    radius: '50',
    query: venue.name
  };
  let service = new window.google.maps.places.PlacesService(map);
  service.textSearch(request, callback);

  function callback(results, status) {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      return results;
      }
    }
}
