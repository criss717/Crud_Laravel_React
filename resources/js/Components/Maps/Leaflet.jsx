import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet.wms';

const Leaflet = () => {
  useEffect(() => {
    const map = L.map('map').setView([40.965, -5.004], 10);

    L.tileLayer.wms('http://ovc.catastro.meh.es/Cartografia/WMS/ServidorWMS.aspx?', {
      layers: 'Catastro,PARCELA',
      tms:true,
      format: 'image/jpeg',
      transparent: true,
      version: '1.1.1',
      attribution: 'DIRECCION GENERAL DEL CATASTRO',
    }).addTo(map);
  }, []);

  return <div id="map" style={{ height: '100vh', width: '100%' }}></div>;
};

export default Leaflet;
