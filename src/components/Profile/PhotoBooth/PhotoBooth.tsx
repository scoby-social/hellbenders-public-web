import { joiResolver } from "@hookform/resolvers/joi";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import InfoIcon from "@mui/icons-material/Info";
import { useWallet } from "@solana/wallet-adapter-react";
import * as React from "react";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { useAtom } from "jotai";

import { Pronouns } from "lib/models/user";
import { getUserByUsername } from "lib/firebase/firestore/users/getUsers";
import { createUser } from "lib/firebase/firestore/users/saveUser";
import {
  combinedLayers,
  currentUser,
  finalCroppedImage,
  photoBoothStep,
  selectedLayerPerStep,
  selectedLeader,
} from "lib/store";
import useCheckMobileScreen from "lib/hooks/useCheckMobileScreen";
import { uploadNFT } from "lib/web3/uploadNFT";
import { checkIfUserHasFakeID } from "lib/web3/checkIfUserHasFakeID";
import { getPoolMintedCount } from "lib/web3/getPoolMintedCount";
import { getWalletBalance } from "lib/web3/getWalletBalance";

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
  mintButton,
  helperText,
  tooltip,
  superheroIdentityWrapper,
  roleFormFields,
} from "./styles";
import { schema } from "./validator";
import { PhotoBoothFormInputs } from "./types";
import LayerBuilder from "./LayerBuilder/LayerBuilder";
import { getStepsLength, getTotalStepsStartingFromOne } from "./utils/getSteps";

const PhotoBooth = () => {
  const router = useRouter();
  const maxStepNumber = getStepsLength();
  const totalSteps = getTotalStepsStartingFromOne();
  const wallet = useWallet();
  const isMobile = useCheckMobileScreen();

  const [currentStep] = useAtom(photoBoothStep);
  const [allCombinedLayers] = useAtom(combinedLayers);
  const [selectedLayers] = useAtom(selectedLayerPerStep);
  const [_, setCurrentUser] = useAtom(currentUser);
  const [leader] = useAtom(selectedLeader);
  const [croppedImage] = useAtom(finalCroppedImage);

  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [mintedCount, setMintedCount] = React.useState(0);

  const {
    control,
    handleSubmit,
    setError,
    watch,
    reset,
    formState: { errors },
  } = useForm<PhotoBoothFormInputs>({
    resolver: joiResolver(schema),
    mode: "all",
  });
  const username = watch("username");

  const submitForm = async (values: PhotoBoothFormInputs) => {
    try {
      setMessage("");
      setLoading(true);

      const walletBalance = await getWalletBalance(
        wallet.publicKey!.toString()
      );

      if (walletBalance.usdc < 6.66) {
        setMessage(
          "Hey! We checked your wallet and you don't have enough crypto to mint. Come back later when you've earned some bread and try again."
        );
        setLoading(false);
        return;
      }

      const resultingLayer = {
        ...allCombinedLayers[allCombinedLayers.length - 1],
      };
      resultingLayer.image = croppedImage!;

      setMessage(
        "Please be patient while our machine elves forge your Fake ID."
      );

      const userHasFakeID = await checkIfUserHasFakeID(wallet);

      if (userHasFakeID) {
        setMessage("This wallet already has a FakeID");
        setLoading(false);
        return;
      }

      const res = await uploadNFT({
        selectedLayers,
        resultingLayer,
        formResult: values,
        leaderWalletAddress: leader.wallet,
        parentNftAddress: leader.fakeID,
        wallet,
        seniority: 0,
        updateMessage: setMessage,
      });

      const user = await createUser(
        {
          ...values,
          wallet: wallet.publicKey!.toString(),
          avatar: res.image,
          fakeID: res.nftAddress,
        },
        leader.fakeID
      );

      // editSeniorityInJsonMetadata(
      // res.metadataUrl,
      // user.seniority,
      // user.username
      // );
      setCurrentUser({ ...user, avatar: res.image, fakeID: res.nftAddress });
      setLoading(false);
      setMessage(
        "Congrats! Your Fake ID has been minted. You'll be redirected to your profile page shortly."
      );
      setTimeout(() => {
        router.push({
          pathname: `/${values.username}`,
          query: { recentlyCreated: true },
        });
      }, 3000);
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

  const getStepTitle = React.useCallback(() => {
    if (currentStep > maxStepNumber) return "Last Step";

    return `Step ${currentStep + 1} of ${totalSteps}`;
    // eslint-disable-next-line
  }, [currentStep]);

  React.useEffect(() => {
    (async () => {
      reset();
      if (wallet.publicKey) {
        const count = await getPoolMintedCount(wallet);
        setMintedCount(count);
      }
    })();
    // eslint-disable-next-line
  }, [wallet]);

  return (
    <Box sx={fakeIDFormContainer}>
      <Form isMobile={isMobile} onSubmit={handleSubmit(submitForm)}>
        <Box sx={fakeIDFormArrowWrapper} />
        <Box sx={formContainer}>
          <Typography align="center" variant="h6">
            Create a New Identity
          </Typography>

          <Grid
            justifyContent="space-around"
            padding="1vmax"
            container
            columnSpacing={4}
          >
            <Grid flex="1" item xs={12} md={6}>
              <Box sx={formWrapper}>
                <Box sx={superheroIdentityWrapper}>
                  <Typography>
                    Your Superhero Identity<sup>*</sup>
                  </Typography>

                  <Tooltip
                    arrow
                    sx={tooltip}
                    title={
                      <span
                        style={{ whiteSpace: "pre-line" }}
                      >{`Your name is how you will be addressed. It can be up to 15 characters or less, containing only letters, numbers and underscores. No spaces allowed.\n\n The Adjective and Noun represent the legendary superpowers inherent in your sovereign soul.`}</span>
                    }
                  >
                    <InfoIcon />
                  </Tooltip>
                </Box>
                <Typography sx={helperText} variant="caption">
                  Example: Punky the Wonderful Spatula
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
                      placeholder="How you want to be addressed in one word 15 letters max"
                      helperText={errors.username?.message || "Example: arcade"}
                      size="small"
                      variant="outlined"
                      inputProps={{ maxLength: 15 }}
                    />
                  )}
                />
              </Box>

              <Box sx={formWrapper}>
                <Box sx={roleFieldWrapper}>
                  <Typography variant="h6">The</Typography>
                  <Controller
                    name="amplifierRole"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="adjective-input"
                        variant="outlined"
                        error={!!errors.amplifierRole}
                        sx={roleFormFields}
                        placeholder="Adjective"
                        helperText={
                          errors.amplifierRole?.message || "Example: Wonderful"
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
                        id="noun-input"
                        variant="outlined"
                        error={!!errors.superpowerRole}
                        sx={roleFormFields}
                        placeholder="Noun"
                        helperText={
                          errors.superpowerRole?.message || "Example: Spatula"
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
                      placeholder="@username"
                      size="small"
                      variant="outlined"
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
                      placeholder="username#1234"
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
                <Typography variant="subtitle1">{getStepTitle()}</Typography>
              </Box>
              <LayerBuilder />
            </Box>
            <Box sx={photoBoothFooterWrapper}>
              <Box sx={mintButtonWrapper}>
                <Button
                  disabled={loading || currentStep <= maxStepNumber}
                  color="primary"
                  variant="contained"
                  type="submit"
                  sx={mintButton}
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
                    {"ID's minted"}
                  </Typography>
                  <Typography variant={"h6"} sx={availabilityDescription}>
                    {mintedCount}
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
