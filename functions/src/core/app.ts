import { Server } from './server';
import { AppRoutes } from './routes';

const server = new Server('/', AppRoutes.routes);
const app = server.start();

export default app;
