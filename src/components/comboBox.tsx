import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface ComboBoxProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  variant?: "outlined" | "filled" | "standard";
  size?: "small" | "medium";
}

const ComboBox: React.FC<ComboBoxProps> = ({
  label,
  options,
  value,
  onChange,
  variant = "standard",
  size = "small",
}) => {
  return (
    <FormControl variant={variant} size={size} fullWidth>
      <InputLabel id={`${label}-label`}>{label}</InputLabel>
      <Select
        labelId={`${label}-label`}
        id={`${label}-select`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label={label}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ComboBox;
