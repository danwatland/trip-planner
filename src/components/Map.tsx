import * as React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { TripLocation } from '../Data';
import { useLocationStore } from '../state/LocationStore';

const position = {
  lat: 51.49581846795866,
  lng: -0.14527781537217113
};

type MapProps = {
  focusedLocation: TripLocation | null
};

const Map = (props: MapProps) => {
  const locations = useLocationStore((state) => state.locations);
  const [map, setMap] = React.useState<google.maps.Map | null>(null);

  React.useEffect(() => {
    if (props.focusedLocation && map) {
      map.panTo({ lat: props.focusedLocation.lat, lng: props.focusedLocation.lng });
    }
  }, [map, props.focusedLocation]);

  const {isLoaded} = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyChtD7AbqlxkkUm-Zc_ly8VdjpO0Vcz3Ss',
    libraries: ['places', 'drawing', 'geometry']
  });

  const onLoad = React.useCallback((map: google.maps.Map) => {
    setMap(map)
  }, []);

  const onUnmount = React.useCallback(() => {
    setMap(null)
  }, []);

  return isLoaded ? (
    <GoogleMap
      center={position}
      mapContainerStyle={{width: '800px', height: '600px'}}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ scaleControl: true }}
      zoom={13}
    >
        {locations.map((location) => (
          <Marker
            key={location.label}
            options={{ map }}
            position={{ lat: location.lat, lng: location.lng }}
          />
        ))}
    </GoogleMap>
  ) : <div/>;
};

export default Map;
