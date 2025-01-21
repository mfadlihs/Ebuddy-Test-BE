import { GetUserByIdDto, UpdateUserByIdDto, type CreateUserDto } from '../dtos';
import { GetUserByEmailDto } from '../dtos/user/getByEmail.dto';
import { UserEntitiy } from '../entities';

export abstract class IUserRepository {
  abstract create(dto: CreateUserDto): Promise<UserEntitiy>;
  abstract getAll(): Promise<UserEntitiy[]>;
  abstract getById(dto: GetUserByIdDto): Promise<UserEntitiy>;
  abstract getByEmail(dto: GetUserByEmailDto): Promise<UserEntitiy>;
  abstract checkDupplicateEmail(dto: GetUserByEmailDto): Promise<boolean>;
  abstract update(dto: UpdateUserByIdDto): Promise<UserEntitiy>;
  abstract delete(dto: GetUserByIdDto): Promise<UserEntitiy>;
}
