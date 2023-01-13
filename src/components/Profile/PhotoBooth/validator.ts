import Joi from "joi";
import { Pronouns } from "lib/models/user";

export const schema = Joi.object({
  username: Joi.string().alphanum().max(10).required().messages({
    "string.empty": "Name is required",
    "string.max": "Name must be less than 10 characters long!",
  }),
  amplifierRole: Joi.string().alphanum().required().messages({
    "string.empty": "Amplifier role is required",
  }),
  superpowerRole: Joi.string().alphanum().required().messages({
    "string.empty": "Superpower role is required",
  }),
  pronouns: Joi.string().valid(...Object.values(Pronouns)),
  bio: Joi.string().max(160).required().messages({
    "string.empty": "Biography is required",
    "string.max": "Biography must be less than 160 characters",
  }),
  twitterHandle: Joi.optional(),
  discordHandle: Joi.optional(),
  telegramHandle: Joi.optional(),
});
