import React from "react";
import { useHistory } from "react-router-dom";

import Input from "../../../shared/components/FormElements/Input";
import Button from "../../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
} from "../../../shared/util/validators";
import { useForm } from "../../../shared/hooks/form-hook";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
import Card from "../../../shared/components/UIElements/Card";

const Register = ({ login, setLogin }) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const registerSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formState.inputs.name.value);
    console.log(formState.inputs.email.value);
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />

      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <form onSubmit={registerSubmitHandler}>
          <h2>REGISTER</h2>

          <Input
            element="input"
            id="name"
            type="text"
            label={"USER ID"}
            validators={[VALIDATOR_REQUIRE()]}
            // errorText="Please enter a Name"
            onInput={inputHandler}
          />

          <Input
            element="input"
            id="email"
            type="email"
            label={"EMAIL"}
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />

          <Input
            element="input"
            id="password"
            type="password"
            label={"PASSWORD"}
            validators={[VALIDATOR_REQUIRE()]}
            // errorText="Please enter a valid password, at least 5 characters."
            onInput={inputHandler}
          />

          <Button type="submit" disabled={!formState.isValid}>
            SIGNUP
          </Button>
          <div style={{ display: "inline-block", marginLeft: "6rem" }}>
            <Button inverse onClick={() => setLogin(!login)}>
              {login ? "LOGIN" : "REGISTER"}
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default Register;
