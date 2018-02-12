import { call } from 'redux-saga/effects';

export const withErrorReporting = (fn) => function *wrappedWithErrorReporting (...args) {
	try {
		const result = yield call(fn, ...args);

		return result;
	} catch (error) {
		console.log(error, fn, args);
		throw error;
	}
};

export default withErrorReporting;