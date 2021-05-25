import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Field } from "react-final-form";
import { Checkbox, TextField } from "final-form-material-ui";

const FormProductDetails = ({ nextStep, prevStep, submitting }) => {
  return (
    <Paper style={{ padding: 16 }}>
      <Grid container spacing={4} justify="center" alignItems="center">
        <Typography variant="h5">Product Details</Typography>
        <Grid item xs={12}>
          <Field
            fullWidth
            multiline
            name="productDesc"
            type="text"
            variant="outlined"
            component={TextField}
            label="Product Description"
            rows={4}
          />
        </Grid>
        <Grid item sm={6} md={4}>
          <Field
            name="prodCategory"
            type="text"
            variant="outlined"
            component={TextField}
            label="Product Category"
          />
        </Grid>
        <Grid item sm={6} md={4}>
          <Field
            name="prodHSN"
            type="text"
            variant="outlined"
            component={TextField}
            label="HSN Code"
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Mark As Fragile</FormLabel>
            <FormGroup row>
              <FormControlLabel
                label="Mark as fragile"
                control={
                  <Field
                    name="fragile"
                    component={Checkbox}
                    type="checkbox"
                    value="fragile"
                  />
                }
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item style={{ marginTop: 16 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => prevStep()}
            disabled={submitting}
          >
            Back
          </Button>
        </Grid>
        <Grid item style={{ marginTop: 16 }}>
          <Button
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

export default FormProductDetails;
