import { joiResolver } from "@hookform/resolvers/joi";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useWallet } from "@solana/wallet-adapter-react";
import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { useAtom } from "jotai";

import { Pronouns } from "lib/models/user";
import { getUserByUsername } from "lib/firebase/firestore/users/getUsers";
import {
  combinedLayers,
  currentUser,
  photoBoothStep,
  selectedLayerPerStep,
  selectedLeader,
} from "lib/store";
import useCheckMobileScreen from "lib/hooks/useCheckMobileScreen";

import {
  fakeIDFormContainer,
  fakeIDFormArrowWrapper,
  formContainer,
  formWrapper,
  roleFieldWrapper,
  photoBoothContainer,
  photoBoothTitleWrapper,
  textWithMargin,
  Form,
  mintButtonWrapper,
  availabilityContainer,
  availabilityWrapper,
  availabilityDescription,
  photoBoothFooterWrapper,
  mintingMessageWrapper,
  mintingMessage,
  formWrapperWithoutMargin,
} from "./styles";
import { schema } from "./validator";
import { PhotoBoothFormInputs } from "./types";
import LayerBuilder from "./LayerBuilder/LayerBuilder";
import { getTotalStepsStartingFromOne } from "./utils/getSteps";
import { uploadNFT } from "lib/web3/uploadNFT";
import { createUser } from "lib/firebase/firestore/users/saveUser";
import { checkIfUserHasFakeID } from "lib/web3/checkIfUserHasFakeID";
import { getSeniorityForUser } from "lib/firebase/firestore/users/getSeniorityForUser";

const PhotoBooth = () => {
  const totalSteps = getTotalStepsStartingFromOne();
  const wallet = useWallet();
  const isMobile = useCheckMobileScreen();
  const [currentStep] = useAtom(photoBoothStep);
  const [allCombinedLayers] = useAtom(combinedLayers);
  const [selectedLayers] = useAtom(selectedLayerPerStep);
  const [_, setCurrentUser] = useAtom(currentUser);
  const [leader] = useAtom(selectedLeader);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
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

  const submitForm = async (values: PhotoBoothFormInputs) => {
    try {
      setLoading(true);
      const resultingLayer = allCombinedLayers[allCombinedLayers.length - 1];

      console.info("Uploading NFT: ", resultingLayer);

      const userHasFakeID = await checkIfUserHasFakeID(wallet);

      console.info("With fakeID: ", userHasFakeID);

      if (userHasFakeID) {
        setMessage("This wallet already has a FakeID");
        return;
      }

      console.info("Minting with NFT parent: ", leader.fakeIDs[0]);

      setMessage(
        "Please be patient while our machine elves forge your Fake ID."
      );

      const userSeniority = await getSeniorityForUser();

      const res = await uploadNFT({
        selectedLayers,
        resultingLayer,
        formResult: values,
        leaderWalletAddress: leader.wallet,
        parentNftAddress: leader.fakeIDs[0],
        wallet,
        seniority: userSeniority,
      });

      console.info("Resulting NFT image: ", res);

      console.info("Uploading user");
      const user = await createUser(
        {
          ...values,
          wallet: wallet.publicKey!.toString(),
          avatar: res.image,
          fakeIDs: [res.nftAddress],
        },
        leader.wallet,
        userSeniority
      );

      console.info("User has been uploaded");

      setCurrentUser({ ...user, avatar: res.image, fakeIDs: [res.nftAddress] });
      setLoading(false);
    } catch (err) {
      setMessage(
        "I dunno why, but the machine elves f*cked up your mint. Try again later."
      );
      console.error(err);
      setLoading(false);
    }
  };

  const validateIfUserExists = React.useCallback(async () => {
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
  }, [username, setError]);

  console.info("Errors: ", errors);

  return (
    <Box sx={fakeIDFormContainer}>
      <Form isMobile={isMobile} onSubmit={handleSubmit(submitForm)}>
        <Box sx={fakeIDFormArrowWrapper}></Box>
        <Box sx={formContainer}>
          <Typography variant="h6">
            The Photobooth: Mint your Fake ID
          </Typography>

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
                    name="amplifierRole"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="amplifier-input"
                        variant="outlined"
                        error={!!errors.amplifierRole}
                        placeholder="Amplifier"
                        helperText={
                          errors.amplifierRole?.message || "Example: Cybernetic"
                        }
                        size="small"
                      />
                    )}
                  />

                  <Controller
                    name="superpowerRole"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="superpower-input"
                        variant="outlined"
                        error={!!errors.superpowerRole}
                        placeholder="Superpower"
                        helperText={
                          errors.superpowerRole?.message || "Example: Being"
                        }
                        size="small"
                      />
                    )}
                  />
                </Box>
              </Box>

              <Box sx={formWrapper}>
                <Typography sx={textWithMargin}>Pronouns</Typography>
                <Controller
                  name="pronouns"
                  control={control}
                  defaultValue={Pronouns.other}
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
              <Box sx={formWrapperWithoutMargin}>
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
                      minRows={2}
                      maxRows={3}
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

              <Box sx={formWrapperWithoutMargin}>
                <Typography sx={textWithMargin}>Twitter</Typography>
                <Controller
                  name="twitterHandle"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="twitter-input"
                      fullWidth
                      onBlur={validateIfUserExists}
                      placeholder="@username"
                      size="small"
                      variant="outlined"
                      inputProps={{ maxLength: 10 }}
                    />
                  )}
                />
              </Box>

              <Box sx={formWrapperWithoutMargin}>
                <Typography sx={textWithMargin}>Discord</Typography>
                <Controller
                  name="discordHandle"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="user-url-input"
                      fullWidth
                      placeholder="@username#1234"
                      size="small"
                      variant="outlined"
                    />
                  )}
                />
              </Box>

              <Box sx={formWrapperWithoutMargin}>
                <Typography sx={textWithMargin}>Telegram</Typography>
                <Controller
                  name="telegramHandle"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="user-url-input"
                      fullWidth
                      placeholder="@username"
                      size="small"
                      variant="outlined"
                    />
                  )}
                />
              </Box>
            </Grid>

            <Box sx={photoBoothContainer}>
              <Box sx={photoBoothTitleWrapper}>
                <Typography variant="subtitle1">
                  Take your Fake ID Photo<sup>*</sup>
                </Typography>
                <Typography variant="subtitle1">{`Step ${
                  currentStep + 1
                } of ${totalSteps}`}</Typography>
              </Box>
              <LayerBuilder />
            </Box>
            <Box sx={photoBoothFooterWrapper}>
              <Box sx={mintButtonWrapper}>
                <Button
                  disabled={loading}
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  {loading ? <CircularProgress /> : "Mint"}
                </Button>
              </Box>
              {message && (
                <Box sx={mintingMessageWrapper}>
                  <Typography sx={mintingMessage} variant="subtitle2">
                    {message}
                  </Typography>
                </Box>
              )}
              <Box sx={availabilityContainer}>
                <Box sx={availabilityWrapper}>
                  <Typography variant={"h6"} sx={availabilityDescription}>
                    Available
                  </Typography>
                  <Typography variant={"h6"} sx={availabilityDescription}>
                    232/3333
                  </Typography>
                </Box>
                <Box sx={availabilityWrapper}>
                  <Typography variant={"h6"} sx={availabilityDescription}>
                    Price
                  </Typography>
                  <Typography variant={"h6"} sx={availabilityDescription}>
                    6.66 USDC
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Box>
      </Form>
    </Box>
  );
};

export default PhotoBooth;
