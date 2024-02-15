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
    valor: number;
    tipo: Transaction.Type;
    descricao: string;
  };

  export type Model = {
    id: string;
    valor: number;
    tipo: Transaction.Type;
    descricao: string;
    realizada_em: string;
  };
}
