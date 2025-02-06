import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

const worker = setupWorker();

export default worker;
