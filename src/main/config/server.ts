import { app } from '@main/config/app';
import http from 'http';

const server = http.createServer(app);

export { server };
