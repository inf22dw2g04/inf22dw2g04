import React from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const Mapa = () => {
  const coordenadas = { lat: 51.505, lng: -0.09 }; // Coordenadas desejadas

  return (
    
    <LoadScript googleMapsApiKey="AIzaSyDab0lc5qSyUH-1yP59OtJI-iAl6U42v_c">
      <h2>Mapa</h2>
      <GoogleMap
        mapContainerStyle={{ height: '400px', width: '100%' }}
        center={coordenadas}
        zoom={13}
      >
        <Marker position={coordenadas} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Mapa;
