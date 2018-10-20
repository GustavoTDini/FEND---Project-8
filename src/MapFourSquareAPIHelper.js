import placeholder from './images/placeholder.svg';

const clientId = 'XJKO2X12JL3NMHCHQUKCYONALVPSMMFUL1L4ROMSDMJ5M35G';
const clientSecret = '230GFGABAMF15RX5FCBJI2UA0XXEJ3R5KXDN2IVYUQ1YUTVL';
const detailsApi = 'https://api.foursquare.com/v2/venues/'
const searchAPi = 'https://api.foursquare.com/v2/venues/search?'
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
    .catch(res => console.log("error" + res.meta.code));

export function createSearchUrl(query, categories){

  let foursquareSearchUrl = new URL(searchAPi);
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

export const getFourSquareDetails = (venueId) =>
  fetch(createDetailsUrl(venueId), {
    method: 'GET'})
    .then(res => res.json())
    .catch(res => console.log("error" + res.meta.code));

export function createDetailsUrl(venueId){
  let foursquareDetailsUrl = new URL(detailsApi);
  let UrlParams = new URLSearchParams(foursquareDetailsUrl);
  UrlParams.append('client_id', clientId);
  UrlParams.append('client_secret', clientSecret);
  UrlParams.append('v', date);
  return(foursquareDetailsUrl + venueId + '?' + UrlParams.toString());
}


export function getVenueDetails(venue){
  console.log(venue);
  let venueObject = {};
  venueObject.id = testIfExist(venue.id, "Missing Id");
  venueObject.name = testIfExist(venue.name, "Missing Name");
  venueObject.address = testIfExist(venue.location.address, "Missing Address");;
  venueObject.url = testIfExist(venue.url, "NoUrl");
  venueObject.price = testPrice(venue.price);
  venueObject.rating = testIfExist(venue.rating, "?.?");
  venueObject.ratingColor = testIfExist(venue.ratingColor, "#ffffff");
  venueObject.description = testIfExist(venue.description, "NoDescription");
  venueObject.photo = getPhoto(venue.photos);
  console.log(venueObject);
  return venueObject;
}

function testIfExist(test, defaultValue){
  if (test){
    return test;
  } else{
    return defaultValue
  }
}

function testPrice(price){
  let showPrice = '?';
  if (price){
    showPrice = '';
    for (let i = 0; i < price.tier; i++){
      showPrice += "$ "
    }
  }
  return showPrice
}

function getPhoto(photos){
  if(photos.count > 0){
    if (photos.groups[1]){
      return photos.groups[1].items[0].prefix + "300x300" + photos.groups[1].items[0].suffix;
    } else if (photos.groups[0]){
      return photos.groups[0].items[0].prefix + "300x300" + photos.groups[0].items[0].suffix;
    }
  }
  return placeholder;
}

export function createErrorMessage(code){
  let codeMessage;
  switch (code) {
    case '400':
      codeMessage = 'Bad Request';
      break;
    case '401':
      codeMessage = 'Unauthorized';
      break;
    case '403':
      codeMessage = 'Forbidden';
      break;
    case '404':
      codeMessage = 'Not Found';
      break;
    case '405':
      codeMessage = 'Method Not Allowed';
      break;
    case '409':
      codeMessage = 'Conflict';
      break;
    case '429':
      codeMessage = 'Daily call quota exceeded';
      break;
    case '500':
      codeMessage = 'Internal Server Error';
      break;
    default:
    codeMessage = 'Unknow Error';
  }
  return codeMessage;
}
