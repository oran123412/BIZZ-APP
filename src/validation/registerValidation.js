import Joi from "joi";

import { validateEmailLogin, validatePasswordLogin } from "./loginValidation";

const firstSchema = Joi.object({
  first: Joi.string()
    .min(2)
    .max(256)
    .regex(/^[A-Za-z]+$/)
    .required(),
});
const lastSchema = Joi.object({
  last: Joi.string()
    .min(2)
    .max(256)
    .regex(/^[A-Za-z]+$/)
    .required(),
});
const phoneSchema = Joi.object({
  phone: Joi.string().min(9).max(11).required(),
});
const countrySchema = Joi.object({
  country: Joi.string()
    .min(2)
    .max(256)
    .regex(/^[A-Za-z]+$/)
    .required(),
});
const citySchema = Joi.object({
  city: Joi.string()
    .min(2)
    .max(256)
    .regex(/^[A-Za-z]+$/)
    .required(),
});
const streetSchema = Joi.object({
  street: Joi.string()
    .min(2)
    .max(256)
    .regex(/^[A-Za-z]+$/)
    .required(),
});
const houseNumberSchema = Joi.object({
  houseNumber: Joi.number().min(2).max(256).required(),
});
const zipSchema = Joi.object({
  zip: Joi.string()
    .pattern(/^[0-9a-zA-Z\- ]{2,256}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Zip code must be 2 to 256 characters long and can only contain numbers, letters, spaces, and dashes.",
      "string.empty": "Zip code cannot be empty.",
      "any.required": "Zip code is required.",
    }),
});

const validateFirstSchema = (first) => firstSchema.validate(first);
const validatelastSchema = (last) => lastSchema.validate(last);
const validatephoneSchema = (phone) => phoneSchema.validate(phone);
const validatecountrySchema = (country) => countrySchema.validate(country);
const validatecitySchema = (city) => citySchema.validate(city);
const validatestreetSchema = (street) => streetSchema.validate(street);
const validatehouseNumberSchema = (houseNumber) =>
  houseNumberSchema.validate(houseNumber);
const validateZipSchema = (zip) => zipSchema.validate(zip);

const validateSchema = {
  first: validateFirstSchema,
  email: validateEmailLogin,
  password: validatePasswordLogin,
  last: validatelastSchema,
  phone: validatephoneSchema,
  country: validatecountrySchema,
  city: validatecitySchema,
  street: validatestreetSchema,
  houseNumber: validatehouseNumberSchema,
  zip: validateZipSchema,
};

export {
  validateEmailLogin,
  validatePasswordLogin,
  validateFirstSchema,
  validatelastSchema,
  validatephoneSchema,
  validatecountrySchema,
  validatecitySchema,
  validatestreetSchema,
  validatehouseNumberSchema,
  validateZipSchema,
  validateSchema,
};
