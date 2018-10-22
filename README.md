# Neighborhood Map Project


## Funcionalidades

Este App utiliza os Apis do GoogleMaps e do foursquare para criar uma lista de locais para se visitar na cidade com varias informações sobre o mesmo, podemos selecionar e buscar conforme categorias e texto de busca, selecionar no mapa e abrir uma infowindow com as informações relevantes sobre os locais

### APIs

##Foursquare places API

#GET Details

Gives the full details about a venue including location, tips, and categories.
If the venue ID given is one that has been merged into another “master” venue, the response will show data about the “master” instead of giving you an error.

#GET Search for Venues

Returns a list of venues near the current location, optionally matching a search term.
To ensure the best possible results, pay attention to the intent parameter below. And if you’re looking for “top” venues or recommended venues, use the explore endpoint instead.
Note that most of the fields returned inside a venue can be optional. The user may create a venue that has no address, city or state (the venue is created instead at the lat/long specified). Your client should handle these conditions safely. For more robust venue information (photos/tips/etc.), please see our venue details endpoint.

##GoogleMaps JavaScript API

The Maps JavaScript API lets you customize maps with your own content and imagery for display on web pages and mobile devices. The Maps JavaScript API features four basic map types (roadmap, satellite, hybrid, and terrain) which you can modify using layers and styles, controls and events, and various services and libraries.

#Markers

A marker identifies a location on a map. By default, a marker uses a standard image. Markers can display custom images, in which case they are usually referred to as "icons." Markers and icons are objects of type Marker.

#Info Windows

An InfoWindow displays content (usually text or images) in a popup window above the map, at a given location. The info window has a content area and a tapered stem. The tip of the stem is attached to a specified location on the map.

## Dependency

Para o Funcionamento deste projeto foi utilizado:

### Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

### Instalation & Production Instructions

#### Environment setup & Libraries

O projeto utiliza as seguintes bibliotecas e pacotes

```sh
  $ npm install --save prop-types sort-by react-router-dom
```

#### Development

Iniciar o Servidor Webpack:

```sh
  $ npm start
```

#### Production Build

```sh
  $ npm run build
```

### icones do Mapa
https://www.thewebtaylor.com/resources/graphics/free-map-marker-pin-icons-psd
```
