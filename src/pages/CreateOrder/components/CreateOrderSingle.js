import React, { useState } from "react";
import { Form } from "react-final-form";
import FormConsigneeDetails from "../../../components/FormConsigneeDetils/FormConsigneeDetails";
import FormOrderDetails from "../../../components/FormOrderDetails/FormOrderDetails";
import FormPaymentMethod from "../../../components/FormPaymentMethod/FormPaymentMethod";
import FormProductDetails from "../../../components/FormProductDetails/FormProductDetails";
import FormSellerDetails from "../../../components/FormSellerDetails/FormSellerDetails";
import FormPickupAndReturn from "../../../components/FormPickupAndReturnDetails/FormPickupAndReturn";
import CompanySelection from "../../../components/CompanySelection/CompanySelection";
const CreateOrderSingle = () => {
  const [step, setStep] = useState(1);
  const nextStep = () => {
    setStep(step + 1);
  };
  const prevStep = () => {
    setStep(step - 1);
  };
  console.log(step);
  return (
    <div className="">
      <Form
        onSubmit={(formValues) => {
          console.log(formValues);
        }}
        validate={(values) => {
          const errors = {};

          return errors;
        }}
      >
        {({ handleSubmit, pristine, form, submitting, values }) => {
          switch (step) {
            case 1:
              return (
                <FormPaymentMethod
                  values={values}
                  nextStep={nextStep}
                  handleSubmit={handleSubmit}
                  pristine={pristine}
                  form={form}
                  submitting={submitting}
                />
              );
            case 2:
              return (
                <FormConsigneeDetails
                  values={values}
                  nextStep={nextStep}
                  prevStep={prevStep}
                  handleSubmit={handleSubmit}
                  pristine={pristine}
                  form={form}
                  submitting={submitting}
                />
              );
            case 3:
              return (
                <FormOrderDetails
                  values={values}
                  nextStep={nextStep}
                  prevStep={prevStep}
                  handleSubmit={handleSubmit}
                  pristine={pristine}
                  form={form}
                  submitting={submitting}
                />
              );
            case 4:
              return (
                <FormProductDetails
                  values={values}
                  nextStep={nextStep}
                  prevStep={prevStep}
                  handleSubmit={handleSubmit}
                  pristine={pristine}
                  form={form}
                  submitting={submitting}
                />
              );
            case 5:
              return (
                <FormSellerDetails
                  values={values}
                  nextStep={nextStep}
                  prevStep={prevStep}
                  handleSubmit={handleSubmit}
                  pristine={pristine}
                  form={form}
                  submitting={submitting}
                />
              );
            case 6:
              return (
                <FormPickupAndReturn
                  values={values}
                  nextStep={nextStep}
                  prevStep={prevStep}
                  handleSubmit={handleSubmit}
                  pristine={pristine}
                  form={form}
                  submitting={submitting}
                />
              );
            case 7:
              return (
                <CompanySelection
                  handleSubmit={handleSubmit}
                  prevStep={prevStep}
                  values={values}
                />
              );
          }
        }}
      </Form>
    </div>
  );
};

export default CreateOrderSingle;
