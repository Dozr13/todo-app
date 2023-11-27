import { Container, Grid, Paper } from "@mui/material";
import { formStyles } from "../../constants/styles";
import { ReactNodeChildrenProps } from "../../interfaces/interfaceProps";

const CommonFormLayout = ({ children }: ReactNodeChildrenProps) => (
  <Container maxWidth="lg" sx={formStyles.container}>
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper sx={formStyles.paper}>{children}</Paper>
      </Grid>
    </Grid>
  </Container>
);

export default CommonFormLayout;
