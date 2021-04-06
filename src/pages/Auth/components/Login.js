import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Input from "../../../shared/components/FormElements/Input";
import Button from "../../../shared/components/FormElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../../shared/util/validators";
import { useForm } from "../../../shared/hooks/form-hook";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
import Card from "../../../shared/components/UIElements/Card";

const Auth = ({ login, setLogin }) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [reset, setReset] = useState(false);
  const [formState, inputHandler] = useForm(
    {
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

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(formState.inputs.email.value);
    console.log(formState.inputs.password.value);
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />

      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>LOG IN</h2>
        <form onSubmit={authSubmitHandler}>
          <Input
            element="input"
            id="email"
            type="email"
            label={"EMAIL"}
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          {!reset && (
            <Input
              element="input"
              id="password"
              type="password"
              label={"PASSWORD"}
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          )}

          <div style={{ display: "inline-block", marginLeft: "3rem" }}>
            {/* <Button inverse onClick={() => setLogin(!login)}>
              {!login ? "LOGIN" : "REGISTER"}
            </Button> */}

            <Button type="submit" disabled={!formState.isValid}>
              LOGIN
            </Button>
            <Button onClick={() => setReset(!reset)}>ResetPassword</Button>
          </div>

          {/* <div sytle={{ display: "inline-block" }}>
            <Button onClick={() => setReset(!reset)}>ResetPassword</Button>
          </div> */}
        </form>
      </Card>
    </>
  );
};

export default Auth;
