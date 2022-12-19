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
import { getUserByUsername } from "lib/firebase/firestore/users/getUsers";

const PhotoBooth = () => {
  const {
    control,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<PhotoBoothFormInputs>({
    resolver: joiResolver(schema),
    mode: "all",
  });
  const username = watch("username");

  const submitForm = (): void => {};

  const validateIfUserExists = async (): Promise<void> => {
    if (username.length === 0) {
      setError("username", {
        message: "Name is required",
        type: "string.empty",
      });
      return;
    }

    const user = await getUserByUsername(username);
    if (Object.keys(user).length > 0) {
      setError(
        "username",
        {
          message: "Username already exists!",
          type: "onBlur",
        },
        { shouldFocus: true }
      );
      return;
    }
  };

  return (
    <Box sx={fakeIDFormContainer}>
      <Form onSubmit={handleSubmit(submitForm)}>
        <Box sx={fakeIDFormArrowWrapper}>
          <KeyboardArrowDownIcon />
        </Box>
        <Box sx={formContainer}>
          <Typography variant="h6">The Photobooth: Mint our Fake ID</Typography>

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
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="username-input"
                      fullWidth
                      onBlur={validateIfUserExists}
                      error={!!errors.username}
                      placeholder="How you want to be addressed in one word 10 letters max"
                      helperText={errors.username?.message || "Example: arcade"}
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
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="amplifier-input"
                        variant="outlined"
                        error={!!errors.amplifier_role}
                        placeholder="Amplifier"
                        helperText={
                          errors.amplifier_role?.message ||
                          "Example: Cybernetic"
                        }
                        size="small"
                      />
                    )}
                  />

                  <Controller
                    name="superpower_role"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="superpower-input"
                        variant="outlined"
                        error={!!errors.superpower_role}
                        placeholder="Superpower"
                        helperText={
                          errors.superpower_role?.message || "Example: Being"
                        }
                        size="small"
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
                  defaultValue={Pronouns.male}
                  render={({ field }) => (
                    <Select
                      {...field}
                      id="pronouns-select"
                      fullWidth
                      size="small"
                      defaultValue=""
                      error={!!errors.pronouns}
                      IconComponent={KeyboardArrowDownIcon}
                    >
                      {Object.values(Pronouns).map((value) => (
                        <MenuItem key={value} value={value}>
                          {value}
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
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="biography-input"
                      multiline
                      minRows={4}
                      maxRows={5}
                      fullWidth
                      error={!!errors.bio}
                      inputProps={{ maxLength: 160 }}
                      placeholder="bio"
                      helperText={errors.bio?.message}
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
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="user-url-input"
                      fullWidth
                      error={!!errors.externalLink}
                      placeholder="URL"
                      helperText={errors.externalLink?.message}
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
            <Box sx={photoBoothContainer}>
              <Box sx={photoBoothTitleWrapper}>
                <Typography>
                  Take your Fake ID Photo<sup>*</sup>
                </Typography>
                <Typography>1/10</Typography>
              </Box>
              <Box></Box>
            </Box>
          </Grid>
        </Box>
      </Form>
    </Box>
  );
};

export default PhotoBooth;
