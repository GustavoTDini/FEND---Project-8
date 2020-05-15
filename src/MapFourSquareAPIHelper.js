import placeholder from './images/placeholder.svg';

const clientId = 'xx';
const clientSecret = 'xx';
const detailsApi = 'https://api.foursquare.com/v2/venues/'
const searchAPi = 'https://api.foursquare.com/v2/venues/search?'
const city = "Sorocaba";
const date = "20181014";
const limit = 20;
const radius = 15000;
const notFound = "Venues Not Found";
const defaultHighlight = false;
const defaultShow = false;

/**
 * Função que usa o Api da foursquare para buscar as localidades conforme a busca e categorias
 *
 * @param query - query da busca a ser colocado na URL
 * @param categories - array das categorias selecionadas
 */
export const searchFourSquarePlaces = (query, categories) =>
  fetch(createSearchUrl(query, categories), {
    method: 'GET'})
    .then(res => res.json())
    .catch(res => console.log("error" + res.Json().meta.code));

/**
 * Função que usa o URLSearchParams para criar o URL de busca do foursquare
 *
 * @param query - query da busca a ser colocado na URL
 * @param categories - array das categorias selecionadas
 *
 * @return - a Url a ser utilizada no API de busca
 */
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

/**
 * Função que cria uma array com as localidade que retorna da busca da foursquare searchAPi
 *
 * @param response - json com a resposta da URL
 *
 * @return - uma array com as localidades já organizadas para serem utilizadas no app
 */
export function createPlacesArray(response){
  let id, title, address, lat, lng, place
  let places = [];
  let listIndex = 1;
  if (!response || response.length === 0 ){
    title = notFound;
    id = 0;
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

/**
 * Função que usa o Api da foursquare para receber os detalhes de uma localidade
 *
 * @param venueId - id da localidade a ser buscada
 */
export const getFourSquareDetails = (venueId) =>
  fetch(createDetailsUrl(venueId), {
    method: 'GET'})
    .then(res => res.json())
    .catch(res => console.log("error" + res.Json().meta.code));

/**
 * Função que usa o URLSearchParams para criar o URL dos detalhes do foursquare
 *
 * @param venueId - id da localidade a ser buscada
 *
 * @return - a Url a ser utilizada no API de detalhes
 */
export function createDetailsUrl(venueId){
  let foursquareDetailsUrl = new URL(detailsApi);
  let UrlParams = new URLSearchParams(foursquareDetailsUrl);
  UrlParams.append('client_id', clientId);
  UrlParams.append('client_secret', clientSecret);
  UrlParams.append('v', date);
  return(foursquareDetailsUrl + venueId + '?' + UrlParams.toString());
}

/**
 * Função que cria um objeto com os detalhes de uma localidade
 *
 * @param venue - json com a resposta da URL
 *
 * @return - um objeto Json com as detalhes de uma localidade já organizadas para serem utilizadas no app
 */
export function getVenueDetails(venue){
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
  return venueObject;
}

/**
 * Função para testar se a informação do Json exite
 *
 * @param test - valor a ser testado se existe
 * @param defaultValue - valor que será colocado no objeto Json caso não houver tal dado
 *
 * @return - o valor a ser colocado no Json de modo a não ser null
 */
function testIfExist(test, defaultValue){
  if (test){
    return test;
  } else{
    return defaultValue
  }
}

/**
 * Função para criar a informação de preço
 *
 * @param price - informação dobre preço do Json
 *
 * @return - o valor a ser colocado no Json de modo a não ser null - poderá ser uma ?,
 * ou um numero de $ correspondendo o preço
 */
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

/**
 * Função para testar se existe uma foto nas informações da API
 *
 * @param photos - Json de photos da API
 *
 * @return - pode ser a URL da foto se houver, ou uma placeholder
 */
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

/**
 * Função para criar a mensagem de erro caso a API falhe
 *
 * @param code - Codigo de Erro
 *
 * @return - mensagem com o porque do erro
 */
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
