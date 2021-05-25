import {
  Paper,
  Typography,
  Grid,
  FormControlLabel,
  FormControl,
  FormGroup,
  Button,
  MenuItem,
} from "@material-ui/core";
import React from "react";
import { Field } from "react-final-form";
import { TextField, Select } from "final-form-material-ui";

const FormSellerDetails = ({ nextStep, prevStep, submitting, pristine }) => {
  return (
    <Paper style={{ padding: 16 }}>
      <Grid container spacing={4} justify="center" alignItems="center">
        <Typography variant="h5">Seller Details</Typography>
        <Grid item xs={12}>
          <Field
            fullWidth
            name="seller"
            component={Select}
            label="Select Seller"
            formControlProps={{ fullWidth: true }}
          >
            <MenuItem value="seller1">Seller 1</MenuItem>
            <MenuItem value="seller2">Seller 2</MenuItem>
          </Field>
        </Grid>

        {/* <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormGroup row>
              <FormControlLabel
                label="Is the seller details same as registered details?"
                control={
                  <Field
                    name="registered"
                    component={Checkbox}
                    type="checkbox"
                    value="true"
                  />
                }
              />
            </FormGroup>
          </FormControl>
        </Grid> */}
        <Grid item sm={6} md={12}>
          <Field
            fullWidth
            name="sellerName"
            type="text"
            variant="outlined"
            component={TextField}
            label="Seller Name"
          />
        </Grid>
        <Grid item sm={6} md={12}>
          <Field
            fullWidth
            multiline
            rows={4}
            name="sellerAddress"
            type="text"
            variant="outlined"
            component={TextField}
            label="Seller Address"
          />
        </Grid>
        <Grid item sm={6} md={6}>
          <Field
            name="sellerGST"
            fullWidth
            type="text"
            variant="outlined"
            component={TextField}
            label="Seller GSTIN"
            required
          />
        </Grid>
        <Grid item sm={6} md={6}>
          <Field
            name="invoice"
            fullWidth
            type="text"
            variant="outlined"
            component={TextField}
            label="Invoice Number"
          />
        </Grid>

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
            disabled={submitting || pristine}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FormSellerDetails;
