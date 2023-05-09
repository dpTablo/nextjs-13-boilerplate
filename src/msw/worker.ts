import { setupWorker, SetupWorker } from 'msw';
import { authHandlers } from '@msw/handlers/authHandlers';

export const worker: SetupWorker = setupWorker(...authHandlers);
