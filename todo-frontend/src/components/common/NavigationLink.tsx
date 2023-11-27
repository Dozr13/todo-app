import { Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { NavigationLinkProps } from "../../interfaces/interfaceProps";

const NavigationLink: React.FC<NavigationLinkProps> = ({ to, text }) => {
  const navigate = useNavigate();

  return (
    <>
      <Typography variant="body2" align="center" sx={{ mt: 2, mb: 1 }}>
        {text}
      </Typography>
      <Button
        color="primary"
        variant="outlined"
        fullWidth
        onClick={() => navigate(to)}
      >
        {text}
      </Button>
    </>
  );
};

export default NavigationLink;
