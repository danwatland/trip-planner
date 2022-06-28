import * as React from 'react'
import logo from './logo.svg'
import './App.css'
import {GoogleMap, useJsApiLoader} from "@react-google-maps/api";

function App() {
    const [map, setMap] = React.useState(null);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyChtD7AbqlxkkUm-Zc_ly8VdjpO0Vcz3Ss'
    });

    const onLoad = React.useCallback((map) => {
        setMap(map)
    }, []);

    const onUnmount = React.useCallback(() => {
        setMap(null)
    }, []);

  return (
    <div className="App">
      {isLoaded && <GoogleMap
          center={{
              lat: 41.6535,
              lng: -93.709
          }}
          mapContainerStyle={{ width: '800px', height: '600px' }}
          onLoad={onLoad}
          onUnmount={onUnmount}
          zoom={11}
      >

      </GoogleMap>}
    </div>
  )
}

export default React.memo(App);
