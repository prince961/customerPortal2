import { Button, Grid, Paper, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Field } from "react-final-form";
import { TextField } from "final-form-material-ui";
import CustomizedTextField from "../../components/CustomizedTextField/CustomizedTextField";

const FormOrderDetails = ({ submitting, nextStep, form, prevStep, values }) => {
  console.log(values);

  console.log();
  return (
    <Paper style={{ padding: 16 }}>
      <Grid container spacing={4} justify="center" alignItems="center">
        <Grid container item xs={12} justify="center">
          <Typography style={{ textAlign: "center" }} variant="h5">
            Order Details
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} style={{ textAlign: "center" }}>
          <Field
            name="reference"
            type="text"
            variant="outlined"
            component={CustomizedTextField}
            label="Reference Number"
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Field
            name="items"
            type="number"
            variant="outlined"
            component={TextField}
            label="Number Of items"
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Field
            name="weight"
            type="number"
            variant="outlined"
            component={TextField}
            label="Weight (gms)"
            required
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Field
            name="commudityValue"
            type="number"
            variant="outlined"
            component={CustomizedTextField}
            label="Commudity Value"
            required
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Field
            name="tax"
            type="number"
            variant="outlined"
            component={CustomizedTextField}
            label="Tax"
            tax={0.18}
            value={values.commudityValue}
            required
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Field
            name="codAmt"
            type="number"
            variant="outlined"
            component={CustomizedTextField}
            label="COD Amount"
            tax={0.18}
            required
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Field
            name="total"
            type="number"
            variant="outlined"
            component={CustomizedTextField}
            label="Total Value"
            tax={0.18}
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

export default FormOrderDetails;
