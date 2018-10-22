import React from 'react';
import InfoWindow from './InfoWindow';
import ReactDOMServer from 'react-dom/server';
import defaultIcon from './icons/MapMarkerBlue.png';
import highlightedIcon from './icons/MapMarkerPink.png';
import * as MapFourSquareAPIHelper from './MapFourSquareAPIHelper';

const ApiKey = 'AIzaSyDEPrsQgonZwOz6P7dJBR0ma-rlPBCeEc0';

/**
 * Função para iniciar o mapa do GoogleMaps
 *
 * @return o mapa criado
 */
export function initMap() {
  return this.map = new window.google.maps.Map(document.getElementById('map'), {
    center: {lat: -23.52973025799875, lng: -47.4653909},
    zoom: 14,
    disableDefaultUI: true,
  });

}

/**
 * Função para criar o script do google maps, ele cria uma promisse que somente estará resolvida
 * caso o script já esteja ativo, evitando erros no React
 *
 * @return a promessa com a resolução do script
 */
export function createMapScript() {
  if (!this.googleMapsPromise) {
    this.googleMapsPromise = new Promise((resolve) => {
      window.resolveGoogleMapsPromise = () => {
        resolve(window.google);
        delete window.resolveGoogleMapsPromise;
      };
      const script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${ApiKey}&callback=resolveGoogleMapsPromise`;
      document.body.appendChild(script);
    });
  }
  return this.googleMapsPromise;
}


/**
 * Função para criar os marcadores no map, adiciona tambem as funções para cada markers
 * para criar o InfoWindow
 *
 * @param places - o Array com os lugares a serem povoados
 * @param map - o mapa aonde os markers serão colocados
 *
 * @return  array com os marcadores criados
 */
export function populateMarkers(places, map) {
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
      populateInfoWindow(this, map, largeInfowindow);
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

/**
 * Função testar os markers e deixa-los com um icone diferente com enfase
 *
 * @param markers - o Array de markers a serem testados
 * @param index - o indice do marker selecionado
 * @param trueFalse - Varivel recebida para verificar se o marker já está selecionado
 *
 * @return uma nova array de marker com a mudança no icone
 */
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

/**
 * Função criar o infowindow do logar selecionado
 *
 * @param marker - o markers aonde será aberto o InfoWindow
 * @param map - o mapa aonde será visualizado
 * @param infowindow - infowindow criada em populateMarkers de modo a ter somente 1 infowindow aberta
 */
function populateInfoWindow(marker, map, infowindow) {
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

/**
 * Função criar os limites do mapa a ser visualizado conforme os markers
 *
 * @param map - o mapa aonde será visualizado
 * @param markers - o Array de markers a serem testados
 */
export function mapBoundaries(map, markers) {
  var bounds = new window.google.maps.LatLngBounds();
  // Extend the boundaries of the map for each marker and display the marker
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
    bounds.extend(markers[i].position);
  }
  map.fitBounds(bounds);
}
