import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import { TextField } from "final-form-material-ui";
import React from "react";
import { Form, Field } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { rateCalculate } from "../../actions/rateAction";
import CustomizedTable from "../../components/CustomizedTable/CustomizedTable";
function createData(company, companyName, product, rate) {
  return {
    company,
    companyName,
    product,
    rate,
  };
}
const imageRender = (src) => <img width="40px" src={src} alt="" />;

const head = [
  { id: "company", label: "Company" },
  { id: "companyName", label: "Company Name" },
  { id: "service", label: "Service" },
  { id: "rate", label: "Rate" },
];

const RateCalculator = () => {
  const body = [];
  const dispatch = useDispatch();

  const { rate, fetching, fetched, error } = useSelector(
    (state) => state.rateData
  );
  console.log(rate, fetching, fetched, error);
  if (rate) {
    Object.keys(rate).forEach((key) => {
      if (key === "APIRateList") {
        let i = 0;
        const service = ["Express", "Standard"];
        // console.log(rate[key])
        rate[key].forEach((item) => {
          body.push(
            createData(
              imageRender(
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1ZxLUksa8GsoCzRmyTFhhXbuXJMvuSzY9_L8YDr1gh3TrSZ5Hmr_2iOcF8F3G50cxU6w&usqp=CAU"
              ),
              "Delhivery",
              service[i++],
              item[0].total_amount
            )
          );
        });
      } else if (key === "DbRateList") {
        if (rate[key] === "Area not availabale") {
          console.log(rate[key]);
        } else {
          rate[key].forEach((item) => {
            body.push(
              createData(
                imageRender(
                  "https://media-exp1.licdn.com/dms/image/C4D0BAQEQ9RVqZcrpEw/company-logo_200_200/0/1612611983273?e=1629936000&v=beta&t=PfXZKqFikCpCdmrhl1G9A0hmE6amZLK3NXhdhpo0XSY"
                ),
                item.company,
                item.service,
                item.price
              )
            );
          });
        }
      }
    });
  }

  return (
    <>
      <Form
        onSubmit={(formValues) => {
          console.log(formValues);
          dispatch(rateCalculate(formValues));
        }}
        validate={(values) => {
          const errors = {};
          if (!values.pincodeDestination) {
            errors.pincodeDestination = "Required";
          }
          if (!values.pincodeOrigin) {
            errors.pincodeOrigin = "Required";
          }
          if (!values.weight) {
            errors.weight = "Required";
          }
          if (
            values.pincodeDestination &&
            values.pincodeDestination.length !== 6
          ) {
            errors.pincodeDestination = "Pincode must be 6 character long";
          }
          if (values.pincodeOrigin && values.pincodeOrigin.length !== 6) {
            errors.pincodeOrigin = "Pincode must be 6 character long";
          }
          return errors;
        }}
      >
        {({ handleSubmit, pristine, errors, form, submitting, values }) => {
          return (
            <Paper style={{ padding: 16 }}>
              <form onSubmit={handleSubmit}>
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item xs={12}>
                    <Typography variant="h5" style={{ marginBottom: "20px" }}>
                      Calculate Rate and Get Best Recommendation
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Field
                      name="pincodeDestination"
                      fullWidth
                      type="text"
                      variant="outlined"
                      component={TextField}
                      label="Destination Pincode"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Field
                      name="pincodeOrigin"
                      fullWidth
                      type="text"
                      variant="outlined"
                      component={TextField}
                      label="Origin Pincode"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Field
                      name="weight"
                      fullWidth
                      type="text"
                      variant="outlined"
                      component={TextField}
                      label="Weight(gms)"
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="secondary"
                      type="submit"
                      // onClick={() => console.log("Hello")}
                      disabled={
                        submitting ||
                        pristine ||
                        !(
                          Object.keys(errors).length === 0 &&
                          errors.constructor === Object
                        )
                      }
                    >
                      Calculate
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          );
        }}
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
          <Paper
            style={{
              marginTop: "50px",
              textAlign: "center",
            }}
          >
            <CustomizedTable headItems={head} bodyItems={body} />
          </Paper>
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

export default RateCalculator;
