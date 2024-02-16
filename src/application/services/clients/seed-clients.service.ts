import { IClientRepository } from '@domain/interfaces';
import { SeedClientsUseCase } from '@domain/use-cases/client.usecase';
import { makeClientRepository } from '@infra/mongodb/repos';
import { clientsSeeds } from '@infra/mongodb/seeds';

export class SeedClientsService implements SeedClientsUseCase {
  constructor(private readonly clientRepository: IClientRepository) {}

  async perform(): Promise<void> {
    await Promise.all(
      clientsSeeds.map(async (client) => {
        const exist = await this.clientRepository.get({
          filter: { id: client.id },
        });

        if (!exist) await this.clientRepository.create(client);
      }),
    );
  }
}

/* istanbul ignore next */
export const makeSeedClientService = (): SeedClientsService => {
  return new SeedClientsService(makeClientRepository());
};
