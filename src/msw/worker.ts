import { setupWorker, SetupWorker } from 'msw';
import { loginHandlers } from '@msw/handlers/loginHandlers';

export const worker: SetupWorker = setupWorker(...loginHandlers);
