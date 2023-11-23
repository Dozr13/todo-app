import { useSnackbar } from "notistack";

export const useSnackbarActions = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showSuccessSnackbar = (message: string) => {
    enqueueSnackbar(message, { variant: "success", autoHideDuration: 3000 });
  };

  const showErrorSnackbar = (message: string) => {
    enqueueSnackbar(message, { variant: "error", autoHideDuration: 3000 });
  };

  return { showSuccessSnackbar, showErrorSnackbar };
};
