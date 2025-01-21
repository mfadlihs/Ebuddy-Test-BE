import { CreateUserDto, GetUserByIdDto, UpdateUserByIdDto } from '../dtos';
import { GetUserByEmailDto } from '../dtos';
import { UserEntitiy } from '../entities';
import { type IUserRepository } from '../repositories';
import { AppError } from '../errors';

export class UserUsecase {
  // * Dependency Injection
  constructor(private readonly repository: IUserRepository) {}

  async create(dto: CreateUserDto): Promise<UserEntitiy> {
    const { email } = dto;
    const getUserByEmailDto = new GetUserByEmailDto(email);

    if (await this.repository.checkDupplicateEmail(getUserByEmailDto)) {
      throw AppError.badRequest({
        message: `Duplicate user data with email ${email} `,
      });
    }

    return await this.repository.create(dto);
  }

  async getAll(): Promise<UserEntitiy[]> {
    return await this.repository.getAll();
  }

  async getById(dto: GetUserByIdDto): Promise<UserEntitiy> {
    return await this.repository.getById(dto);
  }

  async update(dto: UpdateUserByIdDto): Promise<UserEntitiy> {
    return await this.repository.update(dto);
  }

  async delete(dto: GetUserByIdDto): Promise<UserEntitiy> {
    return await this.repository.delete(dto);
  }
}
