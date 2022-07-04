import * as React from 'react'
import './App.css'
import {GoogleMap, useJsApiLoader} from "@react-google-maps/api";
import Map from "./components/Map";

function App() {
  return (
    <div className="App">
      <Map/>
    </div>
  )
}

export default React.memo(App);
