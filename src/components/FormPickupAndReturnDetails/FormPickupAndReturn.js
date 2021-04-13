import { Button, Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import { Field } from "react-final-form";
import { TextField } from "final-form-material-ui";
const FormConsigneeDetails = ({ nextStep, prevStep, submitting, values }) => {
  console.log(values);

  return (
    <Paper style={{ padding: 16 }}>
      <Grid spacing={4} container justfy="center" alignItems="center">
        <Typography variant="h5">Pickup</Typography>
        <Grid item xs={12}>
          <Field
            fullWidth
            multiline
            name="pickupAddress"
            type="text"
            variant="outlined"
            component={TextField}
            label="Pickup Address"
            rows={5}
            required
          />
        </Grid>
        <Grid item sm={6} md={4}>
          <Field
            name="pickupPincode"
            fullWidth
            type="number"
            variant="outlined"
            component={TextField}
            label="Pickup Pincode"
            required
          />
        </Grid>
        <Grid item sm={6} md={4}>
          <Field
            name="pickupCity"
            fullWidth
            type="text"
            variant="outlined"
            component={TextField}
            label="Pickup City"
            required
          />
        </Grid>
        <Grid item sm={6} md={4}>
          <Field
            name="pickupState"
            fullWidth
            type="text"
            variant="outlined"
            component={TextField}
            label="Pickup State"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">Return</Typography>
        </Grid>
        <Grid item xs={12}>
          <Field
            fullWidth
            multiline
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
          <Field
            name="returnPincode"
            fullWidth
            type="number"
            variant="outlined"
            component={TextField}
            label="Return Pincode"
            required
          />
        </Grid>
        <Grid item sm={6} md={4}>
          <Field
            name="returnCity"
            fullWidth
            type="text"
            variant="outlined"
            component={TextField}
            label="Return City"
            required
          />
        </Grid>
        <Grid item sm={6} md={4}>
          <Field
            name="returnState"
            fullWidth
            type="text"
            variant="outlined"
            component={TextField}
            label="Return State"
            required
          />
        </Grid>

        <Grid
          item
          xs={12}
          //   style={{
          //     marginTop: 16,
          //   }}
        >
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
