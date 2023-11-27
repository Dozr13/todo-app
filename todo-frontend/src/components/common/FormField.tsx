import { TextField } from "@mui/material";
import React from "react";
import { FormFieldProps } from "../../interfaces/interfaceProps";

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type = "text",
  value,
  onChange,
}) => (
  <TextField
    name={name}
    label={label}
    type={type}
    fullWidth
    margin="normal"
    value={value}
    onChange={onChange}
    autoComplete={name}
  />
);

export default FormField;
