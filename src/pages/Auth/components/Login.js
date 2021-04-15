import React from "react";
import { useDispatch } from "react-redux";
import { Field, Form } from "react-final-form";
import { login } from "../../../actions/authAction";

const Login = (props) => {
  const dispatch = useDispatch();

  const renderField = (field) => (
    <>
      {console.log(field)}
      <div
        className={`input-field ${
          field.meta.touched && field.meta.error && "red"
        }`}
        // style={{
        //   border: `2px solid ${
        //     field.meta.touched && field.meta.error && "red"
        //   }`,
        // }}
      >
        <i className={field.icon}></i>
        <input
          {...field.input}
          placeholder={field.placeholder}
          autoComplete={field.autocomplete}
        />
      </div>
    </>
  );

  return (
    <Form
      onSubmit={(formValues) => {
        dispatch(login(formValues));
      }}
      validate={(values) => {
        const errors = {};
        if (!values.userName) {
          errors.userName = "Enter a username!";
        }
        if (!values.password) {
          errors.password = "Enter a password!";
        }
        return errors;
      }}
    >
      {({ handleSubmit, pristine, form, submitting }) => (
        <form onSubmit={handleSubmit} className="sign-in-form">
          {/* {console.log(props)} */}
          <h2 className="title">Welcome</h2>
          <Field
            name="userName"
            icon="fas fa-user"
            placeholder="Username"
            type="text"
            component={renderField}
          />
          <Field
            name="password"
            type="password"
            icon="fas fa-lock"
            placeholder="Password"
            component={renderField}
            autocomplete="on"
          />
          <button type="submit" disabled={submitting} className="btn solid">
            Log In
          </button>
        </form>
      )}
    </Form>
  );
};
export default Login;
