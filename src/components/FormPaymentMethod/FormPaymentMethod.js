import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Paper,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Field } from "react-final-form";
import { Radio, Select } from "final-form-material-ui";

const FormPaymentMethod = ({ nextStep, submitting, values }) => {
  console.log(values);

  return (
    <Paper style={{ padding: 16 }}>
      <Grid container justify="center" alignItems="center" spacing={2}>
        <Typography variant="h5">Payment details</Typography>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel compenet="legend">Order Type</FormLabel>
            <RadioGroup row>
              <FormControlLabel
                label="Forward"
                control={
                  <Field
                    name="orderType"
                    component={Radio}
                    type="radio"
                    value="forward"
                  />
                }
              />
              <FormControlLabel
                label="Reverse"
                control={
                  <Field
                    name="orderType"
                    component={Radio}
                    type="radio"
                    value="reverse"
                  />
                }
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <Field
            fullWidth
            name="paymentMode"
            component={Select}
            label="Select Payment Method"
            formControlProps={{ fullWidth: true }}
          >
            <MenuItem value="cod">COD</MenuItem>
            <MenuItem value="prepaid">Pre-paid</MenuItem>
          </Field>
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

export default FormPaymentMethod;
