import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import { Button } from "@mui/material"

import "mapbox-gl/dist/mapbox-gl.css"

import { useAppSelector } from "../hooks"
import { type LocationPayload } from "../../features/map/locationsSlice"
import { PopupContent } from "../../components/PopupComponent"
import { createRoot } from "react-dom/client"
import { useNavigate } from "react-router-dom"

export const Map = () => {
  const navigate = useNavigate()

  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | undefined>()
  const [map, setMap] = useState<mapboxgl.Map | null>(null)

  const locations: LocationPayload[] = useAppSelector(
    state => state.locations.locations,
  )

  useEffect(() => {
    if (!mapboxgl.supported()) {
      alert("Your browser does not support Mapbox GL")
      return
    }
    if (!mapContainerRef.current) return

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

    const newMap = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-99.133209, 19.432608],
      zoom: 11,
    })

    mapRef.current = newMap
    setMap(newMap)

    newMap.on("load", () => {
      locations.forEach(location => {
        const popupNode = document.createElement("div")
        const root = createRoot(popupNode)
        root.render(<PopupContent location={location} />)

        const popup = new mapboxgl.Popup({ offset: 25 }).setDOMContent(
          popupNode,
        )

        new mapboxgl.Marker()
          .setLngLat([location.longitude, location.latitude])
          .setPopup(popup)
          .addTo(newMap)
      })
    })

    return () => newMap.remove()
  }, [locations])

  const handleButtonClick = () => {
    navigate("/add-location")
  }

  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      <div
        ref={mapContainerRef}
        className="map-container"
        style={{ height: "100%", width: "100%" }}
      />
      <Button
        variant="contained"
        onClick={handleButtonClick}
        style={{
          position: "absolute",
          bottom: "5vh",
          left: "50vw",
          zIndex: 1,
        }}
      >
        Add Marker
      </Button>
    </div>
  )
}
