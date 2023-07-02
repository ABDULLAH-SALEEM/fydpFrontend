import { useContext } from "react";
import { SnackbarContext } from "src/context/snackbarContext";

export const useSnack = () => useContext(SnackbarContext);