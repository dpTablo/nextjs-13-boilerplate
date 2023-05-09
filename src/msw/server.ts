import { setupServer, SetupServer } from 'msw/node';
import { authHandlers } from '@msw/handlers/authHandlers';

export const server: SetupServer = setupServer(...authHandlers);
