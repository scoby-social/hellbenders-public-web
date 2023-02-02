import { Box, SxProps, Typography } from "@mui/material";

export const hellbendersDescriptionWrapper: SxProps = {
  width: "100%",
  margin: "1.5vmax 0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const HellbendersDescription = () => (
  <Box sx={hellbendersDescriptionWrapper}>
    <Typography variant="h3">{`Hellbenders is an outlaw biker gang of amphibious superheroes.`}</Typography>
  </Box>
);

export default HellbendersDescription;
