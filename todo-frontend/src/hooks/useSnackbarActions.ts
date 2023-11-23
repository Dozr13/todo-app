import { useSnackbar } from "notistack";

export const useSnackbarActions = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showSuccessSnackbar = (message: string) => {
    enqueueSnackbar(message, { variant: "success" });
  };

  const showErrorSnackbar = (message: string) => {
    enqueueSnackbar(message, { variant: "error" });
  };

  return { showSuccessSnackbar, showErrorSnackbar };
};
