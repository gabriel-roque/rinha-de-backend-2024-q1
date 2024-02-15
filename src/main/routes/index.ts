import { expressAdapter } from '@infra/adapters';
import { logger } from '@main/config/logger';
import { ResourceMapper } from '@main/interfaces';
import { clientsRoutes } from '@main/routes/clients.routes';
import Table from 'cli-table';
import { Express, Router } from 'express';

function logRequest(req: { method: string; path: string }) {
  logger.info(
    `${req.method.toLocaleUpperCase()}`.yellow + ' | ' + `${req.path}`.green,
  );
}

export const mappingRoutes = (app: Express): void => {
  const resources: ResourceMapper[] = [...clientsRoutes];
  const router = Router();

  const table = new Table({
    head: ['METHOD'.blue, 'END-POINT'.blue],
    colWidths: [10, 50],
    style: { compact: true, border: ['red'] },
  });

  resources.forEach((item) => {
    table.push([item.method.toLocaleUpperCase().yellow, item.endPoint]);
  });

  // eslint-disable-next-line no-console
  console.log(table.toString());

  resources.forEach((resource) => {
    const { method, endPoint } = resource;
    router[`${method}`](endPoint, (req, res, next) => {
      logRequest(req);
      expressAdapter.adapt(resource, req, res, next);
    });
  });

  app.use(router);
};
