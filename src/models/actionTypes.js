import actionCreatorCreator from './actionCreatorCreator';

const snakeToCamelCase = (str) => (
	str.toLowerCase().replace(/_\w/g, (match) => match[1].toUpperCase())
);

const generateActions = (types) => Object.keys(types).reduce((actions, typeName) => ({
	...actions,
	[snakeToCamelCase(typeName)]: actionCreatorCreator(types[typeName]),
}), {});

const generateTypes = (namespace, typeNames) => typeNames.reduce((types, typeName) => {
	types[typeName] = `${namespace}/${typeName}_REQUEST`;
	types[typeName] = `${namespace}/${typeName}_SUCCESS`;
	types[typeName] = `${namespace}/${typeName}_FAILURE`;

	return types;
}, {});

const generateActionTypes = (namespace, typeNames) => {
	const types = generateTypes(namespace, typeNames);
	const actions = generateActions(types);

	return {
		actions,
		types,
	};
};

export default generateActionTypes;