import {
  TextField as TF,
  Button,
  Grid,
  Paper,
  Typography,
  Switch,
  FormGroup,
  FormControlLabel,
} from "@material-ui/core";
import React, { useState } from "react";
import { Field } from "react-final-form";
import { TextField } from "final-form-material-ui";
import pincodeApi from "../../apis/pincode";
const FormConsigneeDetails = ({
  nextStep,
  prevStep,
  submitting,
  values,
  pristine,
}) => {
  const [checkedA, setCheckedA] = useState(true);
  const [city, setCity] = useState(!values.pickupCity ? "" : values.pickupCity);
  const [state, setState] = useState(
    !values.pickupState ? "" : values.pickupState
  );
  const [rCity, setRcity] = useState(
    !values.returnCity ? "" : values.returnCity
  );
  const [rState, setRstate] = useState(
    !values.returnState ? "" : values.returnState
  );

  const fetchPincode = async (pincode, field) => {
    try {
      const response = await pincodeApi.get(`/${pincode}`);
      if (response.data.body.length === 0) {
        setCity("");
        setState("");
        setRcity("");
        setRstate("");
      } else {
        if (field === "pickupPincode") {
          setCity(response.data.body[0].CITY);
          setState(response.data.body[0].STATE);
          values.pickupPincode = response.data.body[0].id;
          values.pickupCity = response.data.body[0].CITY;
          values.pickupState = response.data.body[0].STATE;
          values.returnPincode = response.data.body[0].id;
          values.returnCity = response.data.body[0].CITY;
          values.returnState = response.data.body[0].STATE;
        } else {
          setRcity(response.data.body[0].CITY);
          setRstate(response.data.body[0].STATE);
          values.returnPincode = response.data.body[0].id;
          values.returnCity = response.data.body[0].CITY;
          values.returnState = response.data.body[0].STATE;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case `pickupAddress`:
        values.pickupAddress = value;
        values.returnAddress = value;
        break;
      case `pickupPincode`:
        values.pickupPincode = value;

        values.returnPincode = value;
        break;
      case `pickupCity`:
        setCity(value);
        setRcity(value);
        values.pickupCity = value;
        values.returnCity = value;

        break;
      case `pickupState`:
        setState(value);
        setRstate(value);
        values.returnState = value;
        values.pickupState = value;
        break;
      case `returnCity`:
        setRcity(value);
        break;
      case `returnState`:
        setRstate(value);

        break;

      default:
        if (value > 100000) {
          //function
          fetchPincode(value, name);
        }
    }
    values[name] = value;
  };
  console.log(values);
  return (
    <Paper style={{ padding: 16 }}>
      <Grid spacing={4} container justfy="center" alignItems="center">
        <Typography variant="h5">Pickup Address</Typography>
        <Grid item xs={12}>
          <TF
            fullWidth
            multiline
            name="pickupAddress"
            type="text"
            variant="outlined"
            label="Pickup Address"
            rows={5}
            onChange={handleChange}
          />
        </Grid>
        <Grid item sm={6} md={4}>
          <TF
            name="pickupPincode"
            fullWidth
            variant="outlined"
            label="Pickup Pincode"
            required
            onChange={handleChange}
          />
        </Grid>
        <Grid item sm={6} md={4}>
          <TF
            name="pickupCity"
            fullWidth
            variant="outlined"
            label="Pickup City"
            required
            value={city}
            onChange={handleChange}
          />
        </Grid>
        <Grid item sm={6} md={4}>
          <TF
            name="pickupState"
            fullWidth
            variant="outlined"
            label="Pickup State"
            required
            value={state}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={checkedA}
                  onChange={() => setCheckedA(!checkedA)}
                  name="checkedA"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
              }
              label="Return Address Same As Pickup Address"
            />
          </FormGroup>
        </Grid>
        {!checkedA && (
          <>
            <Grid item xs={12}>
              <Typography variant="h5">Return Address</Typography>
            </Grid>
            <Grid item xs={12}>
              <Field
                fullWidth
                multiline
                defaultValue={values.pickupAddress}
                name="returnAddress"
                type="text"
                variant="outlined"
                component={TextField}
                label="Return Address"
                rows={5}
                required
              />
            </Grid>
            <Grid item sm={6} md={4}>
              <TF
                name="returnPincode"
                fullWidth
                variant="outlined"
                label="Return Pincode"
                required
                onChange={handleChange}
              />
            </Grid>
            <Grid item sm={6} md={4}>
              <TF
                name="returnCity"
                fullWidth
                defaultValue={values.pickupCity}
                variant="outlined"
                label="Return City"
                required
                value={rCity}
                onChange={handleChange}
              />
            </Grid>
            <Grid item sm={6} md={4}>
              <TF
                name="returnState"
                fullWidth
                defaultValue={values.pickupCity}
                variant="outlined"
                label="Return State"
                required
                value={rState}
                onChange={handleChange}
              />
            </Grid>
          </>
        )}

        <Grid item xs={12}>
          <Button
            style={{ margin: 10 }}
            variant="contained"
            color="primary"
            onClick={() => prevStep()}
            disabled={submitting}
          >
            Back
          </Button>
          <Button
            style={{ margin: "0 10" }}
            variant="contained"
            color="secondary"
            onClick={() => nextStep()}
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
