import { setupWorker, SetupWorker } from 'msw';
import { authHandlers } from '@msw/handlers/authHandlers';
import { userHandlers } from '@msw/handlers/userHandlers';

export const worker: SetupWorker = setupWorker(...authHandlers, ...userHandlers);
