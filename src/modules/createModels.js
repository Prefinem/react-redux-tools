// TOOD: rename models to modules

import { combineReducers } from 'redux';
import forkSafely from './../sagas/forkSafely';

const createActions = (models) => (
	Object.keys(models).reduce((accumulator, key) => {
		if (models[key].actions) {
			accumulator[key] = models[key].actions;
		}

		return accumulator;
	}, {})
);

const createReducer = (models) => (combineReducers(Object.keys(models).reduce((accumulator, key) => {
	if (models[key].reducer) {
		accumulator[key] = models[key].reducer;
	}

	return accumulator;
}, {})));

const createSagas = (models) => (function *sagas () {
	for (const key in models) {
		if (models[key].sagas) {
			yield forkSafely(models[key].sagas);
		}
	}
});

const createSelectors = (models) => (Object.keys(models).reduce((accumulator, key) => {
	if (models[key].selectors) {
		accumulator[key] = models[key].selectors;
	}

	return accumulator;
}, {}));

const createTypes = (models) => (Object.keys(models).reduce((accumulator, key) => {
	if (models[key].types) {
		accumulator[key] = models[key].types;
	}

	return accumulator;
}, {}));

export const createModels = (models) => ({
	actions: createActions(models),
	reducer: createReducer(models),
	sagas: createSagas(models),
	selectors: createSelectors(models),
	types: createTypes(models),
});

export default createModels;