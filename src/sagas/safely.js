/* eslint-disable consistent-return */
import { call, put } from 'redux-saga/effects';

const types = { SAFELY_FAILURE: 'redux/tools/SAFELY_FAILURE' };
const actions = {
	safelyFailure: (payload) => ({
		payload,
		type: types.SAFELY_FAILURE,
	}),
};

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

export default safely;