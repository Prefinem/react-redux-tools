import { fork, takeEvery, takeLatest, throttle } from 'redux-saga/effects';
import { debounceFor } from 'redux-saga-debounce-effect';
import takeLatestPerKey from './takeLatestPerKey';
import wrapSagaSafely from './wrapSagaSafely';

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
		const [ms, fn2, pattern, saga, ...rest] = args;

		return fork(fn, ms, fn2, pattern, wrapSagaSafely(saga), ...rest);
	}

	return fork(wrapSagaSafely(fn), ...args);
};