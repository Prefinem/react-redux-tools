export const createActions = (models, topLevel) => (
	Object.keys(models).reduce((accumulator, key) => {
		if (models[key].actions) {
			accumulator[key] = models[key].actions;
		}

		return accumulator;
	}, topLevel || {})
);

export default createActions;