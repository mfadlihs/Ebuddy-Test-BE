import express, {
  type Router,
  type Request,
  type Response,
  type NextFunction,
  type Express,
} from 'express';
import { AppError } from '../errors';
import { ErrorMiddleware } from '../middlewares';
import { HttpCode } from '../constants';

export class Server {
  private readonly app: Express = express();
  constructor(
    private readonly prefix: string,
    private readonly routes: Router,
  ) {}

  start(): Express {
    // * Middleware
    this.injectMidddleware();
    // * Enable CORS
    this.enableCors();

    // * Routes
    this.app.use(this.prefix, this.routes);

    // Test API GET /
    this.routes.get('/', (_: Request, res: Response) => {
      return res.status(HttpCode.OK).json({
        message: 'Welcome to API',
      });
    });

    this.routes.all(
      '*',
      (req: Request, _res: Response, next: NextFunction): void => {
        next(
          AppError.notFound({
            message: `Can't find route ${req.originalUrl}!`,
          }),
        );
      },
    );

    this.routes.use(ErrorMiddleware.handleError);

    return this.app;
  }

  /**
   * Function helper to inject middlewares used in express
   */
  injectMidddleware(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  /**
   * Function helper for configuration enable CORS
   */
  enableCors(): void {
    this.app.use((req, res, next) => {
      const allowedOrigins = ['http://localhost:3000', 'http://localhost'];
      const origin = req.headers.origin;
      if (allowedOrigins.includes(origin!)) {
        res.setHeader('Access-Control-Allow-Origin', origin!);
      }
      res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS',
      );
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Accept, Authorization',
      );
      next();
    });
  }
}
