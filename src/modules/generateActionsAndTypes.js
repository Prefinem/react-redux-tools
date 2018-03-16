import { generateActions } from './../actions';
import { generateTypes } from './../types';

export const generateActionsAndTypes = (namespace, typeNames) => {
	const types = generateTypes(namespace, typeNames);
	const actions = generateActions(types);

	return {
		actions,
		types,
	};
};

export default generateActionsAndTypes;