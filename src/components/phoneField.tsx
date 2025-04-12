import React from "react";
import TextField from "@mui/material/TextField";

interface PhoneFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  variant?: "outlined" | "filled" | "standard";
  size?: "small" | "medium";
  helperText?: string;
}

const PhoneField: React.FC<PhoneFieldProps> = ({
  label,
  value,
  onChange,
  variant = "standard",
  size = "small",
  helperText,
}) => {
  const handleIdChange = (newValue: string) => {
    const inputValue = newValue.replace(/-/g, ""); // Remove dashes
    // Check if input contains non-numeric characters
    if (/\D/.test(inputValue)) {
      return;
    }
    // Limit the input to 13 digits
    const limitedValue = inputValue.slice(0, 10);
    // Format the value
    const formattedValue = formatId(limitedValue);
    onChange(formattedValue);
  };

  const formatId = (value: string) => {
    const rawValue = value.replace(/-/g, ""); // Remove existing dashes

    if (rawValue.length <= 3) {
      return rawValue; // No formatting needed for first 3 digits
    } else if (rawValue.length <= 6) {
      return rawValue.replace(/(\d{3})(\d{1,3})/, "$1-$2");
    } else {
      return rawValue.replace(/(\d{3})(\d{3})(\d{1,4})/, "$1-$2-$3");
    }
  };

  return (
    <TextField
      label={label}
      variant={variant}
      size={size}
      value={value}
      onChange={(e) => handleIdChange(e.target.value)}
      helperText={helperText}
    />
  );
};

export default PhoneField;
