import { call } from 'redux-saga/effects';
import { delay } from 'redux-saga';

const retryStrategies = {
	constant: () => 1,
	exponential: (index) => Math.pow(2, index),
	immediate: () => 0,
	linear: (index) => index,
};

export const withRetry = ({ baseDelay = 100, logger, retryAttempts = 5, retryStrategy = 'exponential' } = {}) => (fn) => (
	function *wrappedWithRetry (...args) {
		let index = 0;

		while (index < retryAttempts) {
			try {
				const result = yield call(fn, ...args);

				return result;
			} catch (error) {
				index += 1;

				if (logger) {
					logger(error, fn, args);
				}

				if (index === retryAttempts) {
					throw error;
				}

				yield delay(baseDelay * retryStrategies[retryStrategy](index));
			}
		}

		throw new Error('withRetry failed to execute correctly');
	}
);

export default withRetry;