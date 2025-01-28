import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"

export type LocationPayload = {
  name: string
  latitude: number
  longitude: number
  description?: string
}

export interface LocationsSliceState {
  locations: {
    id: number
    name: string
    latitude: number
    longitude: number
    description?: string
  }[]
}

const initialState: LocationsSliceState = {
  locations: [
    {
      id: 1,
      name: "test",
      latitude: 19.452608,
      longitude: -99.153209,
      description: "test",
    },
    {
      id: 2,
      name: "test2",
      latitude: 19.422608,
      longitude: -99.143209,
      description: "test2",
    },
  ],
}

export const locationsSlice = createAppSlice({
  name: "locations",
  initialState,

  reducers: {
    addLocation: (state, action: PayloadAction<LocationPayload>) => {
      state.locations.push({
        ...action.payload,
        id: Math.max(0, ...state.locations.map(loc => loc.id)) + 1,
      })
    },

    updateLocation: (
      state,
      action: PayloadAction<LocationPayload & { id: number }>,
    ) => {
      const index = state.locations.findIndex(
        location => location.id === action.payload.id,
      )
      if (index !== -1) {
        state.locations[index] = action.payload
      }
    },

    removeLocation: (state, action: PayloadAction<number>) => {
      const index = state.locations.findIndex(
        location => location.id === action.payload,
      )
      if (index !== -1) {
        state.locations.splice(index, 1)
      }
    },
  },
})

export const { addLocation, updateLocation, removeLocation } =
  locationsSlice.actions
