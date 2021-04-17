import {
  TextField as TF,
  Button,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { Field } from "react-final-form";
import { TextField } from "final-form-material-ui";

import pincodeApi from "../../apis/pincode";

const FormConsigneeDetails = ({ nextStep, prevStep, submitting, values }) => {
  const [city, setCity] = useState(!values.city ? "" : values.pickupCity);
  const [state, setState] = useState(!values.state ? "" : values.state);
  const onHandleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case `city`:
        setCity(value);
        break;
      case `state`:
        setState(value);
        break;

      default:
        if (e.target.value > 100000) {
          //function
          fetchPincode(e.target.value);
        }
    }
    values[name] = value;
  };
  const fetchPincode = async (pincode) => {
    try {
      const response = await pincodeApi.get(`/${pincode}`);
      if (response.data.body.length === 0) {
        setCity("");
        setState("");
      } else {
        setCity(response.data.body[0].CITY);
        setState(response.data.body[0].STATE);

        values.pincode = response.data.body[0].id;
        values.city = response.data.body[0].CITY;
        values.state = response.data.body[0].STATE;
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(values);
  return (
    <Paper style={{ padding: 16 }}>
      <Grid spacing={4} container justfy="center" alignItems="center">
        <Typography variant="h5">Consignee(To) Details</Typography>
        <Grid item xs={12}>
          <Field
            fullWidth
            multiline
            name="address"
            type="text"
            variant="outlined"
            component={TextField}
            label="Consignee Address"
            rows={5}
            required
          />
        </Grid>
        <Grid item sm={6} md={4}>
          <TF
            name="pincode"
            fullWidth
            variant="outlined"
            label="Consignee Pincode"
            required
            onChange={onHandleChange}
          />
        </Grid>
        <Grid item sm={6} md={4}>
          <TF
            name="city"
            fullWidth
            variant="outlined"
            label="Consignee City"
            required
            value={city}
            onChange={onHandleChange}
          />
        </Grid>
        <Grid item sm={6} md={4}>
          <TF
            name="state"
            fullWidth
            variant="outlined"
            label="Consignee State"
            required
            value={state}
            onChange={onHandleChange}
          />
        </Grid>
        <Grid item sm={6} md={4}>
          <Field
            name="name"
            fullWidth
            type="text"
            variant="outlined"
            component={TextField}
            label="Consignee Name"
            required
          />
        </Grid>
        <Grid item sm={6} md={4}>
          <Field
            name="phone"
            fullWidth
            type="tel"
            variant="outlined"
            component={TextField}
            label="Consignee Phone"
            required
          />
        </Grid>
        <Grid item sm={6} md={4}>
          <Field
            name="email"
            fullWidth
            type="email"
            variant="outlined"
            component={TextField}
            label="Consignee Email"
            required
          />
        </Grid>

        <Grid item style={{ marginTop: 16 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={prevStep}
            disabled={submitting}
          >
            Back
          </Button>
        </Grid>
        <Grid item style={{ marginTop: 16 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={nextStep}
            disabled={submitting}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FormConsigneeDetails;
