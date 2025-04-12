import React from "react";
import TextField from "@mui/material/TextField";

interface IdFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  variant?: "outlined" | "filled" | "standard";
  size?: "small" | "medium";
  helperText?: string;
}

const IdField: React.FC<IdFieldProps> = ({
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
    const limitedValue = inputValue.slice(0, 13);
    // Format the value
    const formattedValue = formatId(limitedValue);
    onChange(formattedValue);
  };

  const formatId = (value: string) => {
    const rawValue = value.replace(/-/g, ""); // Remove existing dashes

    switch (rawValue.length) {
      case 1:
        return rawValue; // No formatting needed
      case 2:
        return rawValue.replace(/(\d{1})(\d{1})/, "$1-$2");
      case 3:
      case 4:
      case 5:
        return rawValue.replace(/(\d{1})(\d{1,4})/, "$1-$2");
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
        return rawValue.replace(/(\d{1})(\d{4})(\d{1,5})/, "$1-$2-$3");
      case 11:
      case 12:
        return rawValue.replace(
          /(\d{1})(\d{4})(\d{5})(\d{1,2})/,
          "$1-$2-$3-$4"
        );
      case 13:
        return rawValue.replace(
          /(\d{1})(\d{4})(\d{5})(\d{2})(\d{1})/,
          "$1-$2-$3-$4-$5"
        );
      default:
        return rawValue; // Return unformatted if length is invalid
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

export default IdField;
