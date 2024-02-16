import 'reflect-metadata';
import './config/module-alias';

import { makeSeedClientService } from '@application/services/clients';
import { env } from '@main/config/env';
import { logger } from '@main/config/logger';
import { server } from '@main/config/server';

server.listen(env.app.port, async () => {
  logger.info('Seeding initial data...');
  const seedClientService = makeSeedClientService();
  await seedClientService.perform();
  logger.info('Finish seeding data...');

  logger.info(`🔥 Server Listen in: ${env.app.port}`);
});
