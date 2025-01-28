import "./App.css"
import { Routes, Route } from "react-router-dom"
import { Map } from "./app/pages/Map"
import { LocationForm } from "./app/pages/LocationForm"
import logo from "./logo.svg"
import mapboxgl from "mapbox-gl"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Map />} />
      <Route path="/add-location" element={<LocationForm />} />
    </Routes>
  )
}

export default App
