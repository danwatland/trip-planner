import * as React from 'react';
import { GoogleMap, useJsApiLoader, Marker, Polyline } from '@react-google-maps/api';
import { useLocationStore } from '../state/LocationStore';
import { useMapStore } from '../state/MapStore';

const libraries: ('places'|'drawing'|'geometry')[] = ['places', 'drawing', 'geometry']
const position = {
  lat: 51.49581846795866,
  lng: -0.14527781537217113
};

type MapProps = {
  focusedLocation: TripLocation | null
};

const Map = (props: MapProps) => {
  const { locations, locationFilter } = useLocationStore();
  const { map, setMap, directions } = useMapStore();
  const [path, setPath] = React.useState<google.maps.Polyline | null>(null);

  React.useEffect(() => {
    if (props.focusedLocation && map) {
      map.panTo({ lat: props.focusedLocation.lat, lng: props.focusedLocation.lng });
    }
  }, [map, props.focusedLocation]);

  React.useEffect(() => {
    if (path && directions.length === 0) {
      path.setMap(null);
    }
  }, [directions]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyChtD7AbqlxkkUm-Zc_ly8VdjpO0Vcz3Ss',
    libraries
  });

  return isLoaded ? (
    <GoogleMap
      center={position}
      mapContainerStyle={{ width: '800px', height: '600px' }}
      onLoad={(map) => setMap(map)}
      onUnmount={() => setMap(null)}
      options={{ scaleControl: true }}
      zoom={13}
    >
      {locations.filter(locationFilter).map((location) => (
        <Marker
          key={location.label}
          options={{ map }}
          position={{ lat: location.lat, lng: location.lng }}
        />
      ))}
      <Polyline
        options={{ map, strokeColor: '#0000bb' }}
        path={directions.flatMap((leg) => leg.routes[0].overview_path).slice(0, -1)}
        onLoad={(polyline) => setPath(polyline)}
        onUnmount={() => setPath(null)}
      />
    </GoogleMap>
  ) : <div/>;
};

export default Map;
