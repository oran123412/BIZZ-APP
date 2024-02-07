import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import TextInputComponent from "../../components/TextInputComponent";
import validateSchema from "../../validation/createCardValidation";
import axios from "axios";
import normalizeCreate from "./normalizeCreate";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import { toast } from "react-toastify";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import "react-toastify/dist/ReactToastify.css";
import "./CreateCardPage.css";

const CreateCardPage = () => {
  const navigate = useNavigate();
  const [inputsValue, setInputsValue] = useState({
    title: "",
    subtitle: "",
    description: "",
    phone: "",
    email: "",
    web: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    subtitle: "",
    description: "",
    phone: "",
    email: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
  });

  const handleInputsChange = (e) => {
    setInputsValue((cInputsValue) => ({
      ...cInputsValue,
      [e.target.id]: e.target.value,
    }));
  };

  const handleInputsBlur = (e) => {
    const { id, value } = e.target;
    const validationResult = validateSchema[id]
      ? validateSchema[id](value)
      : null;
    if (validationResult && validationResult.error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: validationResult.error.details[0].message,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/cards", normalizeCreate(inputsValue));

      navigate(ROUTES.HOME);
      toast.info("You have created a card successfully!", {
        icon: <CheckCircleOutlineIcon style={{ color: "green" }} />,
        progressClassName: "green-progress-bar",
      });
    } catch (error) {
      toast.info("You have failed to create a new card!", {
        icon: <ErrorOutlineIcon style={{ color: "red" }} />,
        progressClassName: "red-progress-bar",
      });
      console.error("Error creating card:", error);
    }
  };
  useEffect(() => {}, [errors]);

  const noValidationErrors = Object.values(errors).every(
    (error) => error === ""
  );

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Create your card
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          {Object.keys(inputsValue).map((keyName) => (
            <TextInputComponent
              key={keyName}
              id={keyName}
              label={keyName}
              value={inputsValue[keyName]}
              onChange={handleInputsChange}
              onBlur={handleInputsBlur}
              errors={errors[keyName]}
              required={errors[keyName] === "" ? true : false}
            />
          ))}
          <Grid item xs={6}>
            <Button
              type="reset"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() =>
                setInputsValue({
                  title: "",
                  subtitle: "",
                  description: "",
                  phone: "",
                  email: "",
                  web: "",
                  url: "",
                  alt: "",
                  state: "",
                  country: "",
                  city: "",
                  street: "",
                  houseNumber: "",
                  zip: "",
                })
              }
            >
              Refresh
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => navigate(ROUTES.HOME)}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={!noValidationErrors}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default CreateCardPage;
