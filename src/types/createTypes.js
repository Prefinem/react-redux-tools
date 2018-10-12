export const createTypes = (models, topLevel) => (Object.keys(models).reduce((accumulator, key) => {
	if (models[key].types) {
		accumulator[key] = models[key].types;
	}

	return accumulator;
}, topLevel || {}));

export default createTypes;