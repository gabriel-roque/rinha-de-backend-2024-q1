import { Client } from '@domain/models';

export interface SeedClientsUseCase {
  perform(): Promise<void>;
}
export interface GetClientUseCase {
  perform(clientId: number): Promise<Client.Model>;
}
