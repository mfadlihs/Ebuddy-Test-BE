import { ErrorContentCode, REGEX_EMAIL } from '../../constants';
import { AppError } from '../../errors';
import { type AppErrorContent } from '../../types';
import { CoreDto } from '../core.dto';

export class GetUserByEmailDto implements CoreDto<GetUserByEmailDto> {
  constructor(public readonly email: string) {
    this.validate(this);
  }

  validate(dto: GetUserByEmailDto): void {
    const { email } = dto;

    const errors: AppErrorContent[] = [];

    if (!email || !REGEX_EMAIL.test(email)) {
      errors.push({
        code: ErrorContentCode.VALIDATION_ERROR,
        message: 'Email is not valid or empty',
      });
    }

    if (errors.length > 0)
      throw AppError.badRequest({
        message: 'Error validating arguments get user by email',
        errors,
      });
  }
}
