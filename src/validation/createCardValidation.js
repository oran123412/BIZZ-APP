import Joi from "joi";

const titleSchema = Joi.object({
  title: Joi.string().min(2).max(256).required(),
});

const subtitleSchema = Joi.object({
  subtitle: Joi.string().min(2).max(256).required().messages({
    "any.required": "Subtitle is required",
    "string.empty": "Subtitle should not be empty",
    "string.min": "Subtitle must be at least 2 characters",
    "string.max": "Subtitle must be at most 256 characters",
  }),
});

const descriptionSchema = Joi.object({
  description: Joi.string().min(2).max(256).required(),
});

const phoneSchema = Joi.object({
  phone: Joi.string()
    .length(10)
    .pattern(/^05\d{8}$/)
    .required()
    .messages({
      "string.length": "Phone number must be 10 digits starting with 05",
      "string.pattern.base": "Phone number must only contain digits",
    }),
});

const emailSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(5)
    .required(),
});

const webSchema = Joi.object({
  web: Joi.string().min(14).max(256).allow("").messages({
    "string.empty": "Web field can be empty",
    "string.min": "Web field must be at least 14 characters",
    "string.max": "Web field must be at most 256 characters",
  }),
});

const urlSchema = Joi.object({
  url: Joi.string().uri().min(14).max(256).required().messages({
    "string.uri": "URL must be a valid URL",
    "string.min": "URL field must be at least 14 characters",
    "string.max": "URL field must be at most 256 characters",
    "any.required": "URL is required",
  }),
});

const altSchema = Joi.object({
  alt: Joi.string().min(2).max(256).required(),
});

const stateSchema = Joi.object({
  state: Joi.string().min(2).max(256).allow(""),
});

const countrySchema = Joi.object({
  country: Joi.string().min(2).max(256).required(),
});

const citySchema = Joi.object({
  city: Joi.string().min(2).max(256).required(),
});

const streetSchema = Joi.object({
  street: Joi.string().min(2).max(256).required(),
});

const houseNumberSchema = Joi.object({
  houseNumber: Joi.number().min(1).max(10000).required(),
});

const zipSchema = Joi.object({
  zip: Joi.number().min(2).max(9999999).required(),
});

const validateSchema = {
  title: (value) => titleSchema.validate({ title: value }),
  subtitle: (value) => subtitleSchema.validate({ subtitle: value }),
  description: (value) => descriptionSchema.validate({ description: value }),
  phone: (value) => phoneSchema.validate({ phone: value }),
  email: (value) => emailSchema.validate({ email: value }),
  web: (value) => webSchema.validate({ web: value }),
  url: (value) => urlSchema.validate({ url: value }),
  alt: (value) => altSchema.validate({ alt: value }),
  state: (value) => stateSchema.validate({ state: value }),
  country: (value) => countrySchema.validate({ country: value }),
  city: (value) => citySchema.validate({ city: value }),
  street: (value) => streetSchema.validate({ street: value }),
  houseNumber: (value) => houseNumberSchema.validate({ houseNumber: value }),
  zip: (value) => zipSchema.validate({ zip: value }),
};

export default validateSchema;
