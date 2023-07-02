import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "@mui/material";

const LoaderButton = ({
  loadingText,
  showLoader,
  text,
  onClick,
  buttonProps,
  loaderProps,
  hasIcon = false,
  icon,
  extraStyles,
  disabled
}) => {
  loadingText = loadingText || text;
  return (
    <>
      <div>
        <Button
        disabled={disabled}
          variant="outlined"
          onClick={onClick}
          {...buttonProps}
          sx={{
            display: "flex",
            alignItems: "center",
            ...extraStyles
          }}
        >
          {hasIcon && (
            <img
              src={icon}
              width={25}
              height={25}
              style={{ marginRight: "5px" }}
            />
          )}
          {showLoader ? loadingText : text}
          {showLoader && (
            <CircularProgress
              sx={{ marginLeft: "12px" }}
              size={22}
              {...loaderProps}
            />
          )}
        </Button>
      </div>
    </>
  );
};

export default LoaderButton;
