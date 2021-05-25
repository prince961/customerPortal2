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

const FormOrderDetails = ({
  submitting,
  nextStep,
  pristine,
  prevStep,
  values,
}) => {
  console.log(values);
  const [commudity, setCommudity] = useState(
    values.commudityValue ? values.commudityValue : ""
  );
  const [tax, setTax] = useState(values.tax ? values.tax : "");
  const [codAmt, setCodAmt] = useState(values.codAmt ? values.codAmt : "");
  const [total, setTotal] = useState(values.total ? values.total : "");
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case `tax`:
        setTax(value);
        break;
      case `codAmt`:
        setCodAmt(value);
        break;
      case `total`:
        setTotal(value);
        break;
      default:
        setCommudity(value);
        setTatxes(value);
    }
    values[name] = +value;
  };
  const setTatxes = (value) => {
    setTax(value * 0.18);
    setTotal(value * 1.18);
    values.tax = value * 0.18;
    values.total = value * 1.18;
    if (values.paymentMode === "cod") {
      setCodAmt(value * 1.18);
      values.codAmt = value * 1.18;
    }
  };
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
            fullWidth
            type="text"
            variant="outlined"
            component={TextField}
            label="Reference Number"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Field
            defaultValue={1}
            name="items"
            type="number"
            fullWidth
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
            fullWidth
            variant="outlined"
            component={TextField}
            label="Weight (gms)"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TF
            name="commudityValue"
            type="number"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            label="Commudity"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TF
            name="tax"
            type="number"
            fullWidth
            variant="outlined"
            label="Tax"
            value={tax}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TF
            name="total"
            type="number"
            fullWidth
            variant="outlined"
            value={total}
            onChange={handleChange}
            label="Total Value"
          />
        </Grid>
        {values.paymentMode === "cod" && (
          <Grid item xs={12} sm={3}>
            <TF
              name="codAmt"
              type="number"
              fullWidth
              variant="outlined"
              label="COD Amount"
              value={codAmt}
              onChange={handleChange}
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <Button
            style={{ margin: 10 }}
            variant="contained"
            color="primary"
            onClick={prevStep}
            disabled={submitting}
          >
            Back
          </Button>

          <Button
            style={{ margin: "0 10" }}
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

export default FormOrderDetails;
