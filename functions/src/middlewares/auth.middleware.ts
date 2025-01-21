import { type NextFunction, type Request, type Response } from 'express';
import { AppError } from '../errors';
import { getAuth } from 'firebase-admin/auth';

export class AuthMiddleware {
  public async validateJwt(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header('Authorization');

    if (!authorization)
      throw AppError.unauthorized({
        message: 'Unauthorized (no authorization found)',
      });

    if (!authorization.startsWith('Bearer ')) {
      throw AppError.unauthorized({
        message: 'Invalid authorization header (Bearer token required)',
      });
    }

    const token = authorization.split(' ').at(1) ?? '';

    const auth = getAuth();

    auth
      .verifyIdToken(token)
      .then((decodedToken) => {
        req.user = decodedToken;
        next();
      })
      .catch((_) => {
        next(
          AppError.unauthorized({
            message: 'Unauthorized (Invalid token)',
          }),
        );
      });
  }
}
