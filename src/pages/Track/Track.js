import React from "react";
import {
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { TextField } from "final-form-material-ui";
import { Field, Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { trackOrder } from "../../actions/trackAction";
import TrackData from "../../components/TrackData/TrackData";
import TrackScans from "../../components/TrackScans/TrackScans";
const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  SubmitBtn: {
    marginLeft: "2rem",
  },
  textField: {
    margin: "20px 0",
  },
});
const Track = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { ShipmentData, fetching, fetched, error } = useSelector(
    (state) => state.trackData
  );
  console.log(ShipmentData);
  return (
    <>
      <Form
        onSubmit={(formValues) => {
          console.log(formValues);
          dispatch(trackOrder(formValues));
        }}
        validate={(values) => {
          const errors = {};
          if (values.waybill === "") {
            errors.waybill = "Required";
          }
          return errors;
        }}
      >
        {({ handleSubmit, pristine, form, submitting, values }) => (
          <Paper component={"div"}>
            <form onSubmit={handleSubmit} className={classes.root}>
              <Field
                className={classes.textField}
                name="waybill"
                type="text"
                variant="outlined"
                component={TextField}
                label="AWB Number"
                required
              />
              <Button
                className={classes.SubmitBtn}
                variant="contained"
                color="secondary"
                type="submit"
                size="large"
              >
                <i className={`fas fa-2x fa-map-marked-alt`}></i>
              </Button>
            </form>
          </Paper>
        )}
      </Form>
      {fetching ? (
        <Paper
          style={{
            margin: 100,
            textAlign: "center",
            padding: 20,
          }}
        >
          <CircularProgress color="secondary" />
        </Paper>
      ) : (
        fetched &&
        (!error ? (
          <Grid container spacing={4} style={{ marginTop: 12 }}>
            <Grid item md={4}>
              <TrackData Shipment={ShipmentData[0].Shipment} />
            </Grid>
            <Grid item md={8}>
              <TrackScans Shipment={ShipmentData[0].Shipment} />
            </Grid>
          </Grid>
        ) : (
          <Paper
            style={{
              margin: 100,
              textAlign: "center",
              padding: 20,
              color: "red",
            }}
          >
            <Typography variant="h3">{error}</Typography>
          </Paper>
        ))
      )}
    </>
  );
};

export default Track;
