import { cancel, fork, take } from 'redux-saga/effects';

// Allows multiple tasks in parallel but only one at a time per the payload value passed as the key.
export const takeLatestPerKey = (pattern, key, saga, ...args) => fork(function *takeLatestPerKeyFN () { // eslint-disable-line max-params
	const lastTasks = {};

	while (true) { // eslint-disable-line no-constant-condition
		const action = yield take(pattern);

		if (lastTasks[action.payload[key]]) {
			yield cancel(lastTasks[action.payload[key]]);
		}
		lastTasks[action.payload.productAttributeGUID] = yield fork(saga, ...args.concat(action));
	}
});

export default takeLatestPerKey;