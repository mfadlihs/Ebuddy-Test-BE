// import { BadRequestError } from '../errors/badRequestError';
import { Router } from 'express';
import { UserController } from '../controllers';
import { UserUsecase } from '../usecase';
import { UserRepositoryImpl } from '../repositories/user.repository.impl';
import { db } from '../configs';
import { USER_COLLECTION_PATH } from '../constants';
import { AuthMiddleware } from '../middlewares';

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const repository = new UserRepositoryImpl(db, USER_COLLECTION_PATH);
    const usecase = new UserUsecase(repository);
    const controller = new UserController(usecase);
    const authMiddleware = new AuthMiddleware();

    router.use(authMiddleware.validateJwt);

    /**
     * @route GET /user
     * @desc Fetch all users data
     */
    router.get('/', controller.getAll);

    /**
     * @route POST /user
     * @desc Create a new user data
     */
    router.post('/', controller.create);

    /**
     * @route GET /user/:id
     * @desc Retrieve a specific user with an ID
     */
    router.get('/:id', controller.getById);

    /**
     * @route PUT /user/:id
     * @desc Update user data by ID
     */
    router.put('/:id', controller.update);

    /**
     * @route DELETE /user/:id
     * @desc Delete a user by ID
     */
    router.delete('/:id', controller.delete);

    return router;
  }
}
