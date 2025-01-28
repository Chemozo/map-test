import { useState } from "react"
import { Formik, Form, Field } from "formik"
import { TextField, Button, Box, Typography, Container } from "@mui/material"
import * as Yup from "yup"
import { useAppDispatch } from "../hooks"
import { addLocation } from "../../features/map/locationsSlice"
import { useNavigate } from "react-router-dom"

// Validation schema
const LocationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  description: Yup.string().min(
    10,
    "Description must be at least 10 characters",
  ),
  latitude: Yup.number()
    .min(-90, "Must be between -90 and 90")
    .max(90, "Must be between -90 and 90")
    .required("Required"),
  longitude: Yup.number()
    .min(-180, "Must be between -180 and 180")
    .max(180, "Must be between -180 and 180")
    .required("Required"),
})

export const LocationForm = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const handleSubmit = (values: {
    name: string
    description: string
    latitude: number
    longitude: number
  }) => {
    console.log(values)
    dispatch(addLocation(values))
    navigate("/")
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add New Location
        </Typography>

        <Formik
          initialValues={{
            name: "",
            description: "",
            latitude: 0,
            longitude: 0,
          }}
          validationSchema={LocationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values, handleChange, handleBlur }) => (
            <Form>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Location Name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />

                <TextField
                  fullWidth
                  id="description"
                  name="description"
                  label="Description"
                  multiline
                  rows={4}
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                />

                <Box sx={{ display: "flex", gap: 2 }}>
                  <TextField
                    fullWidth
                    id="latitude"
                    name="latitude"
                    label="Latitude"
                    type="number"
                    value={values.latitude}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.latitude && Boolean(errors.latitude)}
                    helperText={touched.latitude && errors.latitude}
                  />

                  <TextField
                    fullWidth
                    id="longitude"
                    name="longitude"
                    label="Longitude"
                    type="number"
                    value={values.longitude}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.longitude && Boolean(errors.longitude)}
                    helperText={touched.longitude && errors.longitude}
                  />
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ mt: 2 }}
                >
                  Submit
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  )
}
