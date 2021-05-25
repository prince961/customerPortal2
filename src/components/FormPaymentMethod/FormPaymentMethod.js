import { Button, Grid, MenuItem, Paper, Typography } from "@material-ui/core";
import React from "react";
import { Field } from "react-final-form";
import { Select } from "final-form-material-ui";

const FormPaymentMethod = ({ nextStep, submitting, values, pristine }) => {
  console.log(values);
  return (
    <Paper style={{ padding: 16 }}>
      <Grid container justify="center" alignItems="center" spacing={2}>
        <Typography variant="h5">Payment details</Typography>

        <Grid item xs={12}>
          <Field
            fullWidth
            name="orderType"
            component={Select}
            label="Select Order Type"
            formControlProps={{ fullWidth: true }}
            defaultValue="forward"
          >
            <MenuItem value="forward">Forward</MenuItem>
            <MenuItem value="reverse">Reverse</MenuItem>
          </Field>
        </Grid>
        <Grid item xs={12}>
          <Field
            fullWidth
            name="paymentMode"
            component={Select}
            label="Select Payment Method"
            formControlProps={{ fullWidth: true }}
            defaultValue="prepaid"
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
            disabled={submitting || pristine}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FormPaymentMethod;
