import { HttpCode } from '../constants';
import { AppErrorContent } from '../types';

interface AppErrorArgs {
  name?: string;
  statusCode: HttpCode;
  message: string;
  errors?: AppErrorContent[];
}

interface CustomAppErrorArgs {
  message: string;
  errors?: AppErrorContent[];
}

export class AppError extends Error {
  public readonly name: string;
  public readonly statusCode: HttpCode;
  public readonly errors?: AppErrorContent[];

  constructor({ message, statusCode, name, errors }: AppErrorArgs) {
    super(message);
    this.name = name ?? 'InternalServerError';
    this.statusCode = statusCode;
    this.errors = errors;
  }

  static badRequest(args: CustomAppErrorArgs): AppError {
    return AppError.createError('BadRequestError', HttpCode.BAD_REQUEST, args);
  }

  static forbidden(args: CustomAppErrorArgs): AppError {
    return AppError.createError('ForbiddenError', HttpCode.FORBIDDEN, args);
  }

  static unauthorized(args: CustomAppErrorArgs): AppError {
    return AppError.createError(
      'UnauthorizedError',
      HttpCode.UNAUTHORIZED,
      args,
    );
  }

  static notFound(args: CustomAppErrorArgs): AppError {
    return AppError.createError('NotFoundError', HttpCode.NOT_FOUND, args);
  }

  static internalServer(args: CustomAppErrorArgs): AppError {
    return AppError.createError(
      'InternalServerError',
      HttpCode.INTERNAL_SERVER_ERROR,
      args,
    );
  }

  private static createError(
    name: string,
    statusCode: HttpCode,
    { message, errors }: CustomAppErrorArgs,
  ): AppError {
    return new AppError({ name, statusCode, message, errors });
  }
}
