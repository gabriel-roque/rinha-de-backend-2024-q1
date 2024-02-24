import { Transaction } from 'src/models';

export namespace ExtractDTO {
  export class TransactionsResponseDTO {
    valor: number;
    tipo: Transaction.Type;
    descricao: string;
    realizada_em: Date;
  }

  export class Response {
    saldo: {
      total: number;
      data_extrato: Date | string;
      limite: number;
    };

    ultimas_transacoes: ExtractDTO.TransactionsResponseDTO[];
  }
}
