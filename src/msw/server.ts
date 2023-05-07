import { setupServer, SetupServer } from 'msw/node';
import { loginHandlers } from '@msw/handlers/loginHandlers';

export const server: SetupServer = setupServer(...loginHandlers);
