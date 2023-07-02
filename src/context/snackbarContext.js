import { createContext, useState, forwardRef } from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SnackbarContext = createContext({});

export function SnackbarProvider({ children }) {
  const [snackbar, setSnackbar] = useState({
    visible: false,
    type: "",
    message: ""
  });

  const showSnackBar = (message, type) => {
    message = typeof message !== "object" ? message : message.toString();
    setSnackbar({
      visible: true,
      message,
      type
    });
  };

  const dismiss = () => {
    setSnackbar({ ...snackbar, visible: false });
  };

  return (
    <SnackbarContext.Provider value={{ showSnackBar }}>
      {children}
      <Snackbar
        open={snackbar.visible}
        autoHideDuration={4000}
        onClose={dismiss}
      >
        <Alert
          onClose={dismiss}
          severity={snackbar.type}
          sx={{ width: "100%" }}
        >
          {snackbar?.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}
