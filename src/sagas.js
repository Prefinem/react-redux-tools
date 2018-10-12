/* eslint-disable consistent-return */
import { all, call, cancel, fork, put, race, take, takeEvery, takeLatest, throttle } from 'redux-saga/effects';
import { compose } from 'redux';
import { debounceFor } from 'redux-saga-debounce-effect';
import { delay } from 'redux-saga';
import raygun from 'common/utils/raygun';

export const types = { SAFELY_FAILURE: 'common/utils/redux/sagas/SAFELY_FAILURE' };
export const actions = {
	safelyFailure: (payload) => ({
		payload,
		type: types.SAFELY_FAILURE,
	}),
};

export function *dispatchAndListen (actions, successTypes, failureTypes) {
	const raceTypes = {
		failure: failureTypes ? race(failureTypes.map((type) => take(type))) : undefined,
		success: all(successTypes.map((type) => take(type))),
	};
	const [result] = yield all([
		race(raceTypes),
		all(actions.map((action) => put(action))),
	]);

	return result;
}

// Allows multiple tasks in parallel but only one at a time per the payload value passed as the key.
export const takeLatestPerKey = (pattern, key, saga, ...args) => fork(function *takeLatestPerKey () { // eslint-disable-line max-params
	const lastTasks = {};

	while (true) { // eslint-disable-line no-constant-condition
		const action = yield take(pattern);

		if (lastTasks[action.payload[key]]) {
			yield cancel(lastTasks[action.payload[key]]);
		}
		lastTasks[action.payload.productAttributeGUID] = yield fork(saga, ...args.concat(action));
	}
});

export function *takeOne (pattern, saga, ...args) {
	const action = yield take(pattern);

	yield call(saga, ...args.concat(action));
}

export const safely = (fn) => function *wrappedSafely (...args) {
	try {
		const result = yield call(fn, ...args);

		return result;
	} catch (error) {
		// compose withErrorReporting for logging
		yield put(actions.safelyFailure({
			args,
			fn,
		}));
	}
};

export const withErrorReporting = (fn) => function *wrappedWithErrorReporting (...args) {
	try {
		const result = yield call(fn, ...args);

		return result;
	} catch (error) {
		raygun.send(error, fn, args);
		throw error;
	}
};

const retryStrategies = {
	constant: () => 1,
	exponential: (i) => Math.pow(2, i),
	immediate: () => 0,
	linear: (i) => i,
};

export const withRetry = ({ baseDelay = 100, logFailures = true, retryAttempts = 5, retryStrategy = 'exponential' } = {}) => (fn) => (
	function *wrappedWithRetry (...args) { // eslint-disable-line max-statements
		let i = 0;

		while (i < retryAttempts) {
			try {
				const result = yield call(fn, ...args);

				return result;
			} catch (error) {
				i += 1;

				if (logFailures) {
					raygun.send(error, fn, args);
				}

				if (i === retryAttempts) {
					throw error;
				}

				yield delay(baseDelay * retryStrategies[retryStrategy](i));
			}
		}
	}
);

export const keepAlive = withRetry({
	retryAttempts: Infinity,
	retryStrategy: 'immediate',
});

export const wrapSagaSafely = compose(safely, withErrorReporting, withRetry({ retryStrategy: 'constant' }));

const sagaHelpers = [
	debounceFor,
	takeEvery,
	takeLatest,
	takeLatestPerKey,
];

export const forkSafely = (fn, ...args) => {
	if (sagaHelpers.includes(fn)) {
		const [pattern, saga, ...rest] = args;

		return fork(fn, pattern, wrapSagaSafely(saga), ...rest);
	} else if (fn === throttle) {
		const [ms, fn, pattern, saga, ...rest] = args;

		return fork(fn, ms, fn, pattern, wrapSagaSafely(saga), ...rest);
	}

	return fork(wrapSagaSafely(fn), ...args);
};
