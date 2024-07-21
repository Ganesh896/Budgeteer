import Joi from "joi";

// schema for user register
export const userRegisterSchema = Joi.object({
    firstName: Joi.string().required().messages({
        "any.required": "First name is required!",
    }),

    lastName: Joi.string().required().messages({
        "any.required": "Last name is required!",
    }),

    email: Joi.string().email().required().messages({
        "any.required": "Email is required",
        "string.email": "Email must be a valid format",
    }),

    password: Joi.string()
        .required()
        .min(8)
        .messages({
            "any.required": "Password is required!",
            "string.min": "Password must be at least 8 character",
            "password.uppercase": "Pasword must contain atleast one uppercase letter",
            "password.lowercase": "Pasword must contain atleast one lowecase letter",
            "password.special": "Pasword must contain atleast one special charater",
        })
        .custom((value, helpers) => {
            if (!/[A-Z]/.test(value)) {
                return helpers.error("password.uppercase");
            }
            if (!/[a-z]/.test(value)) {
                return helpers.error("password.lowercase");
            }
            if (!/[!@#$%]/.test(value)) {
                return helpers.error("password.special");
            }

            return value;
        }),

    phone: Joi.string().regex(/^\d+$/).required().min(10).max(10).messages({
        "any.required": "Phone number is required!",
        "string.min": "Phone number must be 10 numbers",
        "string.max": "Phone number must be 10 numbers",
        "string.pattern.base": "Phone number must be a number",
    }),

    address: Joi.string().required().messages({
        "any.required": "Address is required!",
    }),
}).options({
    stripUnknown: true,
});
