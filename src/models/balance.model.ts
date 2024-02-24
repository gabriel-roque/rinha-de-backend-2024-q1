export namespace Balance {
  export type Model = {
    id: number;
    client_id: number;
    balance: number;
    client_limit?: number;
  };
}
