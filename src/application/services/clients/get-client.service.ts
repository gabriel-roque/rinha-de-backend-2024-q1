import { IClientRepository } from '@domain/interfaces';
import { Client } from '@domain/models';
import { GetClientUseCase } from '@domain/use-cases/client.usecase';
import { makeClientRepository } from '@infra/mongodb/repos';

export class GetClientService implements GetClientUseCase {
  constructor(private readonly clientRepository: IClientRepository) {}

  async perform(clientId: number): Promise<Client.Model> {
    return await this.clientRepository.get({ filter: { id: clientId } });
  }
}

/* istanbul ignore next */
export const makeGetClientService = (): GetClientService => {
  return new GetClientService(makeClientRepository());
};
