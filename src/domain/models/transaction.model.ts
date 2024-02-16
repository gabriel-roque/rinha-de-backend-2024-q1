export namespace Transaction {
  export enum Type {
    Credit = 'c',
    Debit = 'd',
  }

  export type ReturnDTO = {
    limite: number;
    saldo: number;
  };

  export type DTO = {
    client_id: number;
    valor: number;
    tipo: Transaction.Type;
    descricao: string;
  };

  export type Model = {
    id: string;
    client_id: number;
    valor: number;
    tipo: Transaction.Type;
    descricao: string;
    realizada_em: string;
  };
}
