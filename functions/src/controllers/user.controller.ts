import { type Request, type Response, type NextFunction } from 'express';
import { type UserUsecase } from '../usecase';
import { CreateUserDto, GetUserByIdDto, UpdateUserByIdDto } from '../dtos';
import { SuccessResponse } from '../types';
import { UserEntityJson } from '../entities';
import { HttpCode } from '../constants';

export class UserController {
  // * Dependency Injection
  constructor(private readonly usecase: UserUsecase) {}

  public getAll = (
    _req: Request,
    res: Response<SuccessResponse<UserEntityJson[]>>,
    next: NextFunction,
  ): void => {
    this.usecase
      .getAll()
      .then((result) =>
        res.status(HttpCode.OK).json({
          status: 'success',
          statusCode: HttpCode.OK,
          message: 'Success retrieve user data',
          data: result.map((e) => e.toJson()),
        }),
      )
      .catch(next);
  };

  public getById = (
    req: Request,
    res: Response<SuccessResponse<UserEntityJson>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const getUserByIdDto = new GetUserByIdDto(id);

    this.usecase
      .getById(getUserByIdDto)
      .then((result) =>
        res.status(HttpCode.OK).json({
          status: 'success',
          statusCode: HttpCode.OK,
          message: 'Success retrieve user data',
          data: result.toJson(),
        }),
      )
      .catch(next);
  };

  public create = (
    req: Request,
    res: Response<SuccessResponse<UserEntityJson>>,
    next: NextFunction,
  ): void => {
    const { name, email, address, phoneNumber } = req.body;
    const createUserDto = new CreateUserDto(name, email, address, phoneNumber);

    this.usecase
      .create(createUserDto)
      .then((result) =>
        res.status(HttpCode.CREATED).json({
          status: 'success',
          statusCode: HttpCode.CREATED,
          message: 'Success create user data',
          data: result.toJson(),
        }),
      )
      .catch(next);
  };

  public update = (
    req: Request,
    res: Response<SuccessResponse<UserEntityJson>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const { name, address, phoneNumber } = req.body;
    const updateUserByIdDto = new UpdateUserByIdDto(
      id,
      name,
      address,
      phoneNumber,
    );

    this.usecase
      .update(updateUserByIdDto)
      .then((result) =>
        res.status(HttpCode.OK).json({
          status: 'success',
          statusCode: HttpCode.OK,
          message: 'Success update user data',
          data: result.toJson(),
        }),
      )
      .catch(next);
  };

  public delete = (
    req: Request,
    res: Response<SuccessResponse<UserEntityJson>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const getUserByIdDto = new GetUserByIdDto(id);

    this.usecase
      .delete(getUserByIdDto)
      .then((result) =>
        res.status(HttpCode.OK).json({
          status: 'success',
          statusCode: HttpCode.OK,
          message: 'Success delete user data',
          data: result.toJson(),
        }),
      )
      .catch(next);
  };
}
