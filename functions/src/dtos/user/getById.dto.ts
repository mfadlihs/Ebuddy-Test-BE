import { AppError } from '../../errors';
import { type AppErrorContent } from '../../types';
import { CoreDto } from '../core.dto';

export class GetUserByIdDto implements CoreDto<GetUserByIdDto> {
  constructor(public readonly id: string) {
    this.validate(this);
  }

  validate(dto: GetUserByIdDto): void {
    const { id } = dto;

    const errors: AppErrorContent[] = [];
    if (!id) {
      errors.push({
        code: 'ValidationError',
        message: 'Id constraints invalid',
      });
    }

    if (errors.length > 0)
      throw AppError.badRequest({
        message: 'Error validating arguments get user by Id',
        errors,
      });
  }
}
