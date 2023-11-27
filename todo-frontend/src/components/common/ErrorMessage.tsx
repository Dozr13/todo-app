import { Box, Typography } from "@mui/material";

interface ErrorMessageProps {
  errorMessage?: string;
}

const ErrorMessage = ({ errorMessage }: ErrorMessageProps) => {
  return (
    <Box sx={{ height: 10 }}>
      <Typography color="error" variant="caption" align="left">
        {errorMessage}
      </Typography>
    </Box>
  );
};

export default ErrorMessage;
