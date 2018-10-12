import actionCreatorCreator from './actionCreatorCreator';

const snakeToCamelCase = (str) => (
	str.toLowerCase().replace(/_\w/g, (match) => match[1].toUpperCase())
);

export const generateActions = (types) => Object.keys(types).reduce((actions, typeName) => {
	actions[snakeToCamelCase(typeName)] = actionCreatorCreator(types[typeName]);

	return actions;
}, {});

export default generateActions;