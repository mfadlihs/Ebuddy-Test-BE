import { ErrorContentCode, REGEX_EMAIL, REGEX_PHONE } from '../../constants';
import { AppError } from '../../errors';
import { type AppErrorContent } from '../../types';
import { CoreDto } from '../core.dto';

export class CreateUserDto implements CoreDto<CreateUserDto> {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly address: string,
    public readonly phoneNumber: string,
  ) {
    this.validate(this);
  }

  validate(dto: CreateUserDto): void {
    const { name, email, address, phoneNumber } = dto;

    const errors: AppErrorContent[] = [];

    if (!email || !REGEX_EMAIL.test(email)) {
      errors.push({
        code: ErrorContentCode.VALIDATION_ERROR,
        message: 'Email is not valid or empty',
      });
    }

    if (!name) {
      errors.push({
        code: ErrorContentCode.VALIDATION_ERROR,
        message: 'Name is not valid or empty',
      });
    }

    if (!address) {
      errors.push({
        code: ErrorContentCode.VALIDATION_ERROR,
        message: 'Address is not valid or empty',
      });
    }

    if (!phoneNumber || !REGEX_PHONE.test(phoneNumber)) {
      errors.push({
        code: ErrorContentCode.VALIDATION_ERROR,
        message: 'Phone number is not valid or empty',
      });
    }

    if (errors.length > 0)
      throw AppError.badRequest({
        message: 'Error validating arguments create user by Id',
        errors,
      });
  }
}
