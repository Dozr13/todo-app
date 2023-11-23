import { useSnackbar } from "notistack";
import { useState } from "react";

export const useSnackbarActions = () => {
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const showSuccessSnackbar = (message: string) => {
    enqueueSnackbar(message, { variant: "success", autoHideDuration: 3000 });
  };

  const showErrorSnackbar = (message: string) => {
    enqueueSnackbar(message, { variant: "error", autoHideDuration: 3000 });
  };

  return { showSuccessSnackbar, showErrorSnackbar };
};
