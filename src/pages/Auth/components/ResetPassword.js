import React from "react";
import Input from "../../../shared/components/FormElements/Input";
import Button from "../../../shared/components/FormElements/Button";
import { useForm } from "../../../shared/hooks/form-hook";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
import Card from "../../../shared/components/UIElements/Card";

const ResetPassword = () => {
  // const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      newPassword: {
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
    console.log("yes");
  };

  return (
    <>
      {/* <ErrorModal error={error} onClear={clearError} /> */}

      <Card className="authentication">
        <h2>Resetpassword</h2>
        <form onSubmit={authSubmitHandler}>
          <Input
            element="input"
            id="email"
            type="email"
            label={"EMAIL"}
            onInput={inputHandler}
          />

          <Input
            element="input"
            id="newPassword"
            type="password"
            label={"NEWPASSWORD"}
            onInput={inputHandler}
          />
        </form>
        <Button type="submit" disabled={!formState.isValid}>
          Submit
        </Button>
      </Card>
    </>
  );
};

export default ResetPassword;
