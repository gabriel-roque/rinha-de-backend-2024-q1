import { Transaction } from './transaction.model';

export namespace Client {
  export type Model = {
    id: number;
    limite: number;
    saldo: number;
  };

  export type ExtractReturnDTO = {
    saldo: {
      total: number;
      data_extrato: string;
      limite: number;
    };
    ultimas_transacoes: Transaction.Model[];
  };
}
