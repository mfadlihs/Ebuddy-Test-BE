import { ErrorContentCode, REGEX_PHONE } from '../../constants';
import { AppError } from '../../errors';
import { type AppErrorContent } from '../../types';
import { CoreDto } from '../core.dto';

export class UpdateUserByIdDto implements CoreDto<UpdateUserByIdDto> {
  constructor(
    public readonly id: string,
    public readonly name?: string,
    public readonly address?: string,
    public readonly phoneNumber?: string,
  ) {
    this.validate(this);
  }

  validate(dto: UpdateUserByIdDto): void {
    const { id, phoneNumber } = dto;

    const errors: AppErrorContent[] = [];

    if (!id) {
      errors.push({
        code: ErrorContentCode.VALIDATION_ERROR,
        message: 'Id is not valid',
      });
    }

    if (phoneNumber && !REGEX_PHONE.test(phoneNumber)) {
      errors.push({
        code: ErrorContentCode.VALIDATION_ERROR,
        message: 'Phone number is not valid',
      });
    }

    if (errors.length > 0)
      throw AppError.badRequest({
        message: 'Error validating arguments update user by Id',
        errors,
      });
  }
}
