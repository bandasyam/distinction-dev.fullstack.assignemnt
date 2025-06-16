import { Request, Response, NextFunction } from "express";
import { createResponse } from "../utils/helpers";

export const bodyValidator = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    let { value, error } = schema.required().validate(req.body);
    if (error) {
      next(createResponse(400, error.message));
    } else {
      req.body = value;
      next();
    }
  };
};

export const paramsValidator = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    var { value, error } = schema.required().validate(req.params);
    if (error) {
      next(createResponse(400, error.message));
    } else {
      req.params = value;
      next();
    }
  };
};

export const queryValidator = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    var { value, error } = schema.required().validate(req.query);
    if (error) {
      next(createResponse(400, error.message));
    } else {
      Object.assign(req.query, value);
      next();
    }
  };
};
