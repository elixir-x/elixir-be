import { object, string, ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

export const LoginSchema = object({
    body: object({
        email: string({
            required_error: "Email must be specified.",
            invalid_type_error: "Email must be a string."
        })
            .email("You must specify an email."),
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
            invalid_type_error: "Email must be a string."
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

export const validate = (schema: ZodObject<any>) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    } catch (error: any) {
        return res.status(400).send(error.errors);
    }
};