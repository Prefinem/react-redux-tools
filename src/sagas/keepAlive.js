import withRetry from './withRetry';

export const keepAlive = withRetry({
	retryAttempts: Infinity,
	retryStrategy: 'immediate',
});

export default keepAlive;