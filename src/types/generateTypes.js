export const generateTypes = (namespace, typeNames) => typeNames.reduce((types, typeName) => {
	types[typeName] = `${namespace}/${typeName}`;

	// auto-generate failure and success types for async operations
	if (typeName.endsWith('_REQUEST')) {
		const baseTypeName = typeName.replace(/_REQUEST$/, '');
		const failureTypeName = `${baseTypeName}_FAILURE`;
		const successTypeName = `${baseTypeName}_SUCCESS`;

		types[failureTypeName] = `${namespace}/${failureTypeName}`;
		types[successTypeName] = `${namespace}/${successTypeName}`;
	}

	return types;
}, {});

export default generateTypes;