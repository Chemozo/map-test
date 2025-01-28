import { Typography, Paper } from "@mui/material"
import { type LocationPayload } from "../features/map/locationsSlice"

interface PopupContentProps {
  location: LocationPayload
}

export const PopupContent = ({ location }: PopupContentProps) => {
  return (
    <Paper elevation={3} style={{ padding: "10px", maxWidth: "200px" }}>
      <Typography variant="h6">{location.name}</Typography>
      {location.description && (
        <Typography variant="body2">{location.description}</Typography>
      )}
    </Paper>
  )
}
