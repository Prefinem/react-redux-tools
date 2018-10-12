import { combineReducers } from 'redux';
import { forkSafely } from './sagas';

const createReducer = (models) => (combineReducers(Object.keys(models).reduce((accumulator, key) => {
	if (models[key].reducer) {
		accumulator[key] = models[key].reducer;
	}

	return accumulator;
}, {})));

const createSagas = (models, topLevel) => (function *sagas () {
	if (topLevel) {
		yield forkSafely(topLevel);
	}
	for (const key in models) {
		if (models[key].sagas) {
			yield forkSafely(models[key].sagas);
		}
	}
});

const createSelectors = (models, topLevel) => (Object.keys(models).reduce((accumulator, key) => {
	if (models[key].selectors) {
		accumulator[key] = models[key].selectors;
	}

	return accumulator;
}, topLevel || {}));

export const createModels = (models) => ({
	actions: createActions(models),
	reducer: createReducer(models),
	sagas: createSagas(models),
	selectors: createSelectors(models),
	types: createTypes(models)
});


const extendReducer = (first, second) => ((state, action) => (second.reducer(first.reducer(state, action), action)));

const extendSagas = (first, second) => (function *sagas () {
	yield forkSafely(first.sagas);
	yield forkSafely(second.sagas);
});

const extendSelectors = (first, second) => ({
	...first.selectors,
	...second.selectors
});



export const extendModel = (first, second) => ({
	actions: extendActions(first, second),
	reducer: first.reducer && second.reducer ? extendReducer(first, second) : (first.reducer || second.reducer),
	sagas: first.sagas && second.sagas ? extendSagas(first, second) : (first.sagas || second.sagas),
	selectors: extendSelectors(first, second),
	types: extendTypes(first, second)
});
