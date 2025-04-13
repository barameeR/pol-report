import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { List, ListItem, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface InputFileUploadProps {
  label?: string;
  variant?: "text" | "outlined" | "contained";
  value?: Record<string, File> | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: (id: string) => void;
  multiple?: boolean;
  accept?: string;
  className?: string;
}

export default function InputFileUpload(props: InputFileUploadProps) {
  return (
    <>
      <Button
        className={props.className}
        component="label"
        role={undefined}
        variant={props.variant ?? "contained"}
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        {props.label ?? "Upload File"}
        <VisuallyHiddenInput
          type="file"
          onChange={props.onChange}
          multiple={props.multiple}
          accept={props.accept}
        />
      </Button>
      {props.value && Object.entries(props.value).length > 0 && (
        <List className={props.className}>
          {Object.entries(props.value).map(([id, file]) => (
            <ListItem
              key={id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => props.onDelete(id)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={file.name} />
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}
