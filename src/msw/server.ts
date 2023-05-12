import { setupServer, SetupServer } from 'msw/node';
import { authHandlers } from '@msw/handlers/authHandlers';
import { userHandlers } from '@msw/handlers/userHandlers';

export const server: SetupServer = setupServer(...authHandlers, ...userHandlers);
