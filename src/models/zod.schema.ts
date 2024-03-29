import { object, string, ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";
import { sendError } from "../utils/request-util";
import { StatusCodes } from "http-status-codes";

// https://stackoverflow.com/questions/72674930/zod-validator-validate-image/72759158

export const LoginSchema = object({
    body: object({
        user: string({
            required_error: "Email or Username must be specified.",
            invalid_type_error: "Email or Username must be a string."
        }),
        password: string({
            required_error: "Password must be specified.",
            invalid_type_error: "Password must be a string."
        })
            .min(8, "Password must be at least 8 characters.")
            .max(128, "Password cannot be longer than 128 characters."),
    })
});

export const RegisterSchema = object({
    body: object({
        email: string({
            required_error: "Email must be specified.",
            invalid_type_error: "Must be an email."
        })
            .email("You must specify an email."),

        username: string({
            required_error: "Username must be specified.",
            invalid_type_error: "Username must be a string."
        })
            .min(3, "Username must be at least 3 characters.")
            .max(48, "Username cannot be longer than 48 characters."),

        password: string({
            required_error: "Password must be specified.",
            invalid_type_error: "Password must be a string."
        })
            .min(8, "Password must be at least 8 characters.")
            .max(128, "Password cannot be longer than 128 characters.")
    })
});


export const UpdateUserSchema = object({
    body: object({
        username: string({
            invalid_type_error: "Username must be a string."
        })
            .min(3, "Username must be at least 3 characters.")
            .max(48, "Username cannot be longer than 48 characters.")
            .optional(),
        email: string({
            invalid_type_error: "Must be an email."
        })
            .optional(),
        password: string({
            invalid_type_error: "Password must be a string."
        })
            .min(8, "Password must be at least 8 characters.")
            .max(128, "Password cannot be longer than 128 characters.")
            .optional(),
        confirmPassword: string({
            invalid_type_error: "Confirm Password must be a string."
        })
            .min(8, "Password must be at least 8 characters.")
            .max(128, "Password cannot be longer than 128 characters.")
            .optional(),
        profileUrl: string({
            invalid_type_error: "Profile URL must be a string."
        })
            .optional(),
        bio: string({
            invalid_type_error: "Bio must be a string."
        })
            .optional()
    })
})
    // .partial()
    // .superRefine((data, ctx) => {
    //     // const { email, bio, username, profileUrl } = data.body;
    //     // if (!email && !bio && !username && !profileUrl) {
    //     //     ctx.addIssue({
    //     //         code: "custom",
    //     //         message: 'You must specify something to update.'
    //     //     });
    //     // }
    //     // if modifying important details the password to the account must be specified
    //     // if (data.email || data.username && (!!data.password || !!data.confirmPassword)) {
    //     //     return ctx.addIssue({
    //     //         code: "custom",
    //     //         message: 'You must enter a password to change important user details.'
    //     //     });
    //     // }
    // });

export const EmailVerificationSchema = object({
    query: object({
        token: string({
            required_error: "Token must be specified.",
            invalid_type_error: "Token must be a string."
        }),
    })
});

export const EmailVerificationCheckSchema = object({
    token: string({
        required_error: "Token must be specified.",
        invalid_type_error: "Token must be a string."
    }),
    code: string({
        required_error: "Code must be specified.",
        invalid_type_error: "Code must be a string."
    })
});

export const CheckUsernameSchema = object({
    query: object({
        username: string({
            required_error: "Username must be specified.",
            invalid_type_error: "Username must be a string."
        })
            .min(3, "Username must be at least 3 characters.")
            .max(48, "Username cannot be longer than 48 characters.")
    })
});

export const validate = (schema: ZodObject<any>) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    } catch (error: any) {
        return sendError(res, [
            ...error.errors.map((err: any) => {
                return {
                    code: err.code,
                    message: err.message
                };
            })
        ], StatusCodes.BAD_REQUEST);
    }
};
