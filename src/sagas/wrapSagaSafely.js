import { compose } from 'redux';
import safely from './safely';
import withErrorReporting from './withErrorReporting';
import withRetry from './withRetry';

export const wrapSagaSafely = compose(
	safely,
	withErrorReporting,
	withRetry({ retryStrategy: 'constant' })
);

export default wrapSagaSafely;