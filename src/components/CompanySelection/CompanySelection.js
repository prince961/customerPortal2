import { Button, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import { CheckCircle } from "@material-ui/icons";
import CustomizedTable from "../CustomizedTable/CustomizedTable";
import React from "react";
function createData(company, product, promisedTAT, pastTAT, rate) {
  return {
    company,
    product,
    promisedTAT,
    pastTAT,
    rate,
  };
}
const imageRender = (src) => <img width="40px" src={src} alt="" />;
const body = [
  createData(
    imageRender("https://assets.aftership.com/couriers/svg/dtdc-express.svg"),
    "Priority",
    "5 days",
    "4 days",
    100
  ),
  createData(
    imageRender("https://assets.aftership.com/couriers/svg/dtdc-express.svg"),
    "Premium",
    "2 days",
    "1 days",
    200
  ),
  createData(
    imageRender(
      "https://w7.pngwing.com/pngs/102/952/png-transparent-pettah-thiruvananthapuram-delhivery-courier-logo-organization-d-miscellaneous-angle-company.png"
    ),
    "Surface",
    "4 days",
    "4 days",
    80
  ),
  createData(
    imageRender(
      "https://w7.pngwing.com/pngs/102/952/png-transparent-pettah-thiruvananthapuram-delhivery-courier-logo-organization-d-miscellaneous-angle-company.png"
    ),
    "Air",
    "3 days",
    "3 days",
    100
  ),
];
const head = [
  { id: "company", label: "Company" },
  { id: "product", label: "Product" },
  { id: "promisedTAT", label: "Promised TAT" },
  { id: "pastTAT", label: "Past TAT" },
  { id: "rate", label: "Rate" },
];
const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  heading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
});
const CompanySelection = ({ handleSubmit, values, prevStep, submitting }) => {
  const classes = useStyles();
  console.log(values);
  return (
    <form onSubmit={handleSubmit}>
      <Paper className={classes.root}>
        <Grid spacing={4} container justfy="center" alignItems="center">
          <Grid item xs={12} className={classes.heading}>
            <Typography variant="h4">You are almost there</Typography>
            <CheckCircle color="secondary" fontSize="large" />
          </Grid>

          <Grid md={6} item className="filledDetails">
            <Paper style={{ padding: 16 }}>
              <Typography variant="h5">
                Confirm your details one more time
              </Typography>
              <Grid spacing={2}>
                {values &&
                  Object.keys(values).map((key) => (
                    <Grid xs={12} item>
                      <Typography>
                        {key.toUpperCase()} : {values[key]}
                      </Typography>
                    </Grid>
                  ))}
              </Grid>
            </Paper>
          </Grid>
          <Grid item md={6} className="filledDetails">
            <Paper>
              <CustomizedTable headItems={head} bodyItems={body} />
            </Paper>
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
              type="submit"
              color="secondary"
              disabled={submitting}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};

export default CompanySelection;