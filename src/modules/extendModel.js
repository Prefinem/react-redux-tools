import forkSafely from './../sagas/forkSafely';

const extendActions = (first, second) => ({
	...first.actions,
	...second.actions,
});

const extendReducer = (first, second) => ((state, action) => (second.reducer(first.reducer(state, action), action)));

const extendSagas = (first, second) => (function *sagas () {
	yield forkSafely(first.sagas);
	yield forkSafely(second.sagas);
});

const extendSelectors = (first, second) => ({
	...first.selectors,
	...second.selectors,
});

const extendTypes = (first, second) => ({
	...first.types,
	...second.types,
});

export const extendModel = (first, second) => ({
	actions: extendActions(first, second),
	reducer: first.reducer && second.reducer ? extendReducer(first, second) : (first.reducer || second.reducer),
	sagas: first.sagas && second.sagas ? extendSagas(first, second) : (first.sagas || second.sagas),
	selectors: extendSelectors(first, second),
	types: extendTypes(first, second),
});

export default extendModel;