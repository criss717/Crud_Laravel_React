import React, { useEffect } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { Vector } from 'ol/source';
import { TileWMS } from 'ol/source';

const SpainMap = () => {
  useEffect(() => {
    // Capa de mapa en blanco
    const blankLayer = new TileLayer({
      source: new Vector(),
    });

    const map = new Map({
      target: 'map',
      layers: [blankLayer],
      view: new View({
        // Ajusta las coordenadas y el zoom para centrar el mapa en España
        center: [-3.7492, 40.4637],  // Coordenadas del centro de España
        zoom: 6,
      }),
    });

    // Añadir capa WMS para mostrar solo España (puedes necesitar un servicio WMS)
    const wmsLayer = new TileLayer({
      source: new TileWMS({
        url: 'http://ovc.catastro.meh.es/Cartografia/WMS/ServidorWMS.aspx',  // Reemplaza con la URL de tu servicio WMS
        params: { 'LAYERS': 'TU_CAPA_WMS' },  // Reemplaza con el nombre de tu capa WMS
        serverType: 'geoserver',
        crossOrigin: 'anonymous',
      }),
    });

    // Añadir capa WMS al mapa
    map.addLayer(wmsLayer);

    return () => {
      map.dispose();
    };
  }, []);

  return (
    <div id="map" style={{ width: '100%', height: '400px' }}></div>
  );
};

export default SpainMap;
