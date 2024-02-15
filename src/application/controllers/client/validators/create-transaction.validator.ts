import { AppError } from '@application/errors';
import { ValidatorContract } from '@domain/contracts';
import { Http } from '@main/interfaces';
import * as Yup from 'yup';

const params = Yup.object().shape({
  id: Yup.number().positive().required(),
});

const body = Yup.object().shape({
  valor: Yup.number().positive().required(),
  tipo: Yup.string().oneOf(['d', 'c']).required(),
  descricao: Yup.string().min(1).max(10).required(),
});

export class CreateTransactionValidator implements ValidatorContract {
  async handle(request: Http.Request): Promise<void | Error> {
    try {
      await params.validate(request.params, {
        abortEarly: false,
      });

      await body.validate(request.body, {
        abortEarly: false,
      });
    } catch (e) {
      throw new AppError({
        message: 'Validation failed',
        category: 'FAILED_IN_CREATE_TRANSACTION',
        status: Http.StatusCode.BAD_REQUEST,
        messages: e,
      });
    }
  }
}

export const createTransactionValidator = new CreateTransactionValidator();
