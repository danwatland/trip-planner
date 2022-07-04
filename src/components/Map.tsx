import * as React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const Map = () => {
    const [map, setMap] = React.useState<google.maps.Map | null>(null);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyChtD7AbqlxkkUm-Zc_ly8VdjpO0Vcz3Ss'
    });

    const onLoad = React.useCallback((map: google.maps.Map) => {
        setMap(map)
    }, []);

    const onUnmount = React.useCallback(() => {
        setMap(null)
    }, []);

    return isLoaded ? (
        <GoogleMap
            center={{
                lat: 41.6535,
                lng: -93.709
            }}
            mapContainerStyle={{ width: '800px', height: '600px' }}
            onLoad={onLoad}
            onUnmount={onUnmount}
            zoom={11}
        >

        </GoogleMap>
    ) : <div/>;
};

export default Map;
