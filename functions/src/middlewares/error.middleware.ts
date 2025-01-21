import { AppError } from '../errors';
import { NextFunction, Request, Response } from 'express';
import { ErrorResponse } from '../types';
import { HttpCode } from '../constants';

export class ErrorMiddleware {
  public static handleError = (
    error: Error,
    _: Request,
    res: Response<ErrorResponse>,
    _next: NextFunction,
  ): void => {
    if (error instanceof AppError) {
      const { name, message, statusCode, errors, stack } = error;
      res.status(statusCode).json({
        status: 'error',
        name,
        message,
        statusCode,
        errors,
        stack,
      });
    }

    res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      name: 'InternalServerError',
      statusCode: HttpCode.INTERNAL_SERVER_ERROR,
      message: 'Unexpected errors occured',
      stack: error.message,
    });
  };
}

export default ErrorMiddleware;
