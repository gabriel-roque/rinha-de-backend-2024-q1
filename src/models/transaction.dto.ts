import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transaction } from 'src/models';

// For Only duplicate class validator not run with namespace typescript
export enum TransactionTypeEnum {
  CREDIT = 'c',
  DEBIT = 'd',
}

export namespace TransactionDTO {
  export class Request {
    @IsNotEmpty()
    @IsInt()
    valor: number;

    @IsNotEmpty()
    @IsEnum(TransactionTypeEnum)
    tipo: Transaction.Type;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(10)
    descricao: string;
  }

  export class Response {
    limite: number;
    saldo: number;
  }
}
