import React from "react";
import { useDispatch } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { login } from "../../../actions/authAction";

const Login = (props) => {
  const dispatch = useDispatch();

  const renderField = (field) => (
    <>
      <div
        className="input-field"
        style={{
          border: `2px solid ${
            field.meta.touched && field.meta.error && "red"
          }`,
        }}
      >
        <i className={field.icon}></i>
        <input type="text" {...field.input} placeholder={field.placeholder} />
      </div>
    </>
  );
  const onLoginSubmit = (formValues) => {
    dispatch(login(formValues));
  };
  return (
    <form onSubmit={props.handleSubmit(onLoginSubmit)} className="sign-in-form">
      <h2 className="title">Welcome</h2>
      <Field
        name="userName"
        icon="fas fa-user"
        placeholder="Username"
        component={renderField}
      />
      <Field
        name="password"
        icon="fas fa-lock"
        placeholder="Password"
        component={renderField}
      />
      <input type="submit" value="Login" className="btn solid" />
    </form>
  );
};
function validate(values) {
  const errors = {};
  if (!values.userName) {
    errors.userName = "Enter a username!";
  }
  if (!values.password) {
    errors.password = "Enter a password!";
  }
  return errors;
}
export default reduxForm({
  form: "LoginForm",
  validate,
})(Login);
