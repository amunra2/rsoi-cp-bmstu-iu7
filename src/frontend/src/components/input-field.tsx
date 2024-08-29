import React from 'react';
import TextField from '@mui/material/TextField';
import { ThemeProvider } from "@mui/material/styles";
import {MyTheme} from "../theme-mui";

interface InputFieldProps {
  label: string;
  value: string;
  setValue: (value: string) => void;
}

export default function InputField(props: InputFieldProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setValue(event.target.value);
  }

  return (
    <ThemeProvider theme={MyTheme}>
      <TextField
      id="filled-required"
      label={props.label}
      variant="filled"
      value={props.value}
      onChange={handleChange}
    />
    </ThemeProvider>
  )
}
