import Ajv from 'ajv';
import type { Request, Response, NextFunction } from 'express';
import { JsonSchema } from '../types/utilType';

export const jsonValidator = (inputSchema: JsonSchema) => {
    const ajv = new Ajv();
    return (req: Request, res: Response, next: NextFunction) => {
        const validate = ajv.compile(inputSchema);
        const data = req.body;
        const valid = validate(data);
        if (!valid) {
            if (validate.errors) {
                const errorMessage = validate.errors[0].message;
                console.error(errorMessage);
                return res.status(400).send(errorMessage);
            };
        };
        next();
    };
};
