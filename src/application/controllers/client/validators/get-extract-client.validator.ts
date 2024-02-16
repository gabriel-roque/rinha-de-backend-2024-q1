import { AppError } from '@application/errors';
import { ValidatorContract } from '@domain/contracts';
import { logger } from '@main/config/logger';
import { Http } from '@main/interfaces';
import * as Yup from 'yup';

const params = Yup.object().shape({
  id: Yup.number().positive().required(),
});

export class GetExtractClientValidator implements ValidatorContract {
  async handle(request: Http.Request): Promise<void | Error> {
    try {
      logger.info(JSON.stringify(request.params));

      await params.validate(request.params, {
        abortEarly: false,
      });
    } catch (e) {
      throw new AppError({
        message: 'Validation failed',
        category: 'FAILED_IN_GET_EXTRACT_CLIENT_VALIDATOR',
        status: Http.StatusCode.BAD_REQUEST,
        messages: e,
      });
    }
  }
}

export const getExtractClientValidator = new GetExtractClientValidator();
