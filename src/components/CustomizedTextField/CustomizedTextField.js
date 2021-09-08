import React from "react";
import TextField from "@material-ui/core/TextField";

const CustomizedTextField = ({
  input,
  onChange,
  value,
  name,
  meta,
  tax,
  ...rest
}) => {
  return (
    <TextField
      {...rest}
      name={input.name}
      helperText={meta.touched ? meta.error : undefined}
      error={meta.error && meta.touched}
      inputProps={input.restInput}
      onChange={onChange}
      value={input.value}
    />
  );
};
export default CustomizedTextField;