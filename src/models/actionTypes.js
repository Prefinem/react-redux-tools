import actionCreatorCreator from './actionCreatorCreator';

const snakeToCamelCase = (str) => (
	str.toLowerCase().replace(/_\w/g, (match) => match[1].toUpperCase())
);

export const generateActions = (types) => Object.keys(types).reduce((actions, typeName) => ({
	...actions,
	[snakeToCamelCase(typeName)]: actionCreatorCreator(types[typeName]),
}), {});

export const generateTypes = (namespace, typeNames) => typeNames.reduce((types, typeName) => {
	types[`${typeName.toUpperCase()}_FAILURE`] = `${namespace.toLowerCase()}/${typeName.toUpperCase()}_FAILURE`;
	types[`${typeName.toUpperCase()}_REQUEST`] = `${namespace.toLowerCase()}/${typeName.toUpperCase()}_REQUEST`;
	types[`${typeName.toUpperCase()}_SUCCESS`] = `${namespace.toLowerCase()}/${typeName.toUpperCase()}_SUCCESS`;

	return types;
}, {});

export const generateActionTypes = (namespace, typeNames) => {
	const types = generateTypes(namespace, typeNames);
	const actions = generateActions(types);

	return {
		actions,
		types,
	};
};

export default generateActionTypes;