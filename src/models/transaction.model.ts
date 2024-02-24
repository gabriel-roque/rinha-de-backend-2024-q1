export namespace Transaction {
  export enum Type {
    CREDIT = 'c',
    DEBIT = 'd',
  }

  export type Model = {
    amount: number;
    type: Transaction.Type;
    description: string;
    created_at: Date;
  };
}
