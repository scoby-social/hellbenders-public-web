import Joi from "joi";
import { Pronouns } from "lib/models/user";

export const schema = Joi.object({
  username: Joi.string().alphanum().max(10).required().messages({
    "string.empty": "Name is required",
    "string.max": "Name must be less than 10 characters long!",
  }),
  amplifier_role: Joi.string().alphanum().required().messages({
    "string.empty": "Amplifier role is required",
  }),
  superpower_role: Joi.string().alphanum().required().messages({
    "string.empty": "Superpower role is required",
  }),
  pronouns: Joi.string().valid(...Object.values(Pronouns)),
  bio: Joi.string().max(160).required().messages({
    "string.empty": "Biography is required",
    "string.max": "Biography must be less than 160 characters",
  }),
  externalLink: Joi.string()
    .regex(
      /^(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i
    )
    .optional()
    .messages({
      "string.pattern.base": "Value should be a valid URL!",
    }),
});
