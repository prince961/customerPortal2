import { Button, Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import { Field } from "react-final-form";
import { TextField } from "final-form-material-ui";
const FormConsigneeDetails = ({ nextStep, prevStep, submitting, values }) => {
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
          <Field
            name="pincode"
            fullWidth
            type="number"
            variant="outlined"
            component={TextField}
            label="Consignee Pincode"
            required
          />
        </Grid>
        <Grid item sm={6} md={4}>
          <Field
            name="city"
            fullWidth
            type="text"
            variant="outlined"
            component={TextField}
            label="Consignee City"
            required
          />
        </Grid>
        <Grid item sm={6} md={4}>
          <Field
            name="state"
            fullWidth
            type="text"
            variant="outlined"
            component={TextField}
            label="Consignee State"
            required
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
            type="number"
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
