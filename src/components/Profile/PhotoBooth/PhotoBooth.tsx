import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import {
  Box,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { Pronouns } from "lib/models/user";
import {
  fakeIDFormContainer,
  fakeIDFormArrowWrapper,
  formContainer,
  formWrapper,
  roleFieldWrapper,
  socialButtonsWrapper,
  photoBoothContainer,
  photoBoothTitleWrapper,
  textWithMargin,
  Form,
} from "./styles";
import { schema } from "./validator";
import { PhotoBoothFormInputs } from "./types";

const PhotoBooth = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PhotoBoothFormInputs>({
    resolver: joiResolver(schema),
  });

  const submitForm = () => {};

  return (
    <Box sx={fakeIDFormContainer}>
      <Form onSubmit={handleSubmit(submitForm)}>
        <Box sx={fakeIDFormArrowWrapper}>
          <KeyboardArrowDownIcon />
        </Box>
        <Box sx={formContainer}>
          <Typography variant="h6">The Photobooth: Mint our Fake ID</Typography>

          <Box sx={photoBoothContainer}>
            <Box sx={photoBoothTitleWrapper}>
              <Typography>
                Take your Fake ID Photo<sup>*</sup>
              </Typography>
              <Typography>1/10</Typography>
            </Box>
            <Box></Box>
          </Box>

          <Grid
            justifyContent="space-around"
            padding="1vmax"
            container
            columnSpacing={4}
          >
            <Grid flex="1" item xs={12} md={6}>
              <Box sx={formWrapper}>
                <Typography sx={textWithMargin}>
                  Name<sup>*</sup>
                </Typography>
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="username-input"
                      fullWidth
                      placeholder="How you want to be addressed in one word 10 letters max"
                      helperText="Example: arcade"
                      size="small"
                      variant="outlined"
                      inputProps={{ maxLength: 10 }}
                    />
                  )}
                />
              </Box>
              <Box sx={formWrapper}>
                <Typography sx={textWithMargin}>
                  Role in Unit<sup>*</sup>
                </Typography>
                <Box sx={roleFieldWrapper}>
                  <Typography variant="h6">The</Typography>
                  <Controller
                    name="amplifier_role"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="amplifier-input"
                        variant="outlined"
                        placeholder="Amplifier"
                        size="small"
                        helperText="Example: Cybernetic"
                      />
                    )}
                  />

                  <Controller
                    name="superpower_role"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="superpower-input"
                        variant="outlined"
                        placeholder="Superpower"
                        size="small"
                        helperText="Example: Being"
                      />
                    )}
                  />
                </Box>
              </Box>
              <Box sx={formWrapper}>
                <Typography sx={textWithMargin}>
                  Pronouns<sup>*</sup>
                </Typography>
                <Controller
                  name="pronouns"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      id="pronouns-select"
                      fullWidth
                      size="small"
                      defaultValue=""
                      IconComponent={KeyboardArrowDownIcon}
                    >
                      {Object.entries(Pronouns).map(([value, index]) => (
                        <MenuItem key={index} value={value}>
                          {index}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </Box>
            </Grid>
            <Grid flex="1" item xs={12} md={6}>
              <Box sx={formWrapper}>
                <Typography sx={textWithMargin}>
                  Bio<sup>*</sup>
                </Typography>
                <Controller
                  name="bio"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="biography-input"
                      multiline
                      minRows={4}
                      maxRows={5}
                      fullWidth
                      inputProps={{ maxLength: 160 }}
                      placeholder="bio"
                      variant="outlined"
                    />
                  )}
                />
              </Box>
              <Box sx={formWrapper}>
                <Typography sx={textWithMargin}>
                  External Link<sup>*</sup>
                </Typography>
                <Controller
                  name="externalLink"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="user-url-input"
                      fullWidth
                      placeholder="URL"
                      size="small"
                      variant="outlined"
                    />
                  )}
                />
              </Box>
              <Box sx={socialButtonsWrapper}>
                <Box></Box>
                <Box></Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Form>
    </Box>
  );
};

export default PhotoBooth;
