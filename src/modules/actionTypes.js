// TODO: Split into actions / types for independent files

import actionCreatorCreator from './actionCreatorCreator';

const snakeToCamelCase = (str) => (
	str.toLowerCase().replace(/_\w/g, (match) => match[1].toUpperCase())
);

const camelToSnakeCase = (str) => (
	str.replace(/([A-Z])/g, ($1) => "_"+$1.toLowerCase()).toUpperCase()
);

export const generateActions = (types) => Object.keys(types).reduce((actions, typeName) => ({
	...actions,
	[snakeToCamelCase(typeName)]: actionCreatorCreator(types[typeName]),
}), {});

export const generateTypes = (namespace, typeNames) => typeNames.reduce((types, typeName) => {
	types[`${typeName.toUpperCase()}`] = `${namespace}/${typeName.toUpperCase()}`;
	types[`${typeName.toUpperCase()}_FAILURE`] = `${namespace}/${typeName.toUpperCase()}_FAILURE`;
	types[`${typeName.toUpperCase()}_SUCCESS`] = `${namespace}/${typeName.toUpperCase()}_SUCCESS`;

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

// types.js
import { generateTypes } from 'react-redux-tools/types';

const types = generateTypes('app', ['getVar']);

export default types;

// actions.js
import { generateActions } from 'react-redux-tools/actions';
import types from './types';

const actions = generateActions(types);

export default actions;

// sagas.js
// inside redux/logger/sagas.js
import actions from './actions';

yield put(actions.getVar.success(payload));

// reducer.js
// inside redux/logger/reducer.js
import types from './types';

switch (action.type) {
	case types.getVar.success:
		// After saga called
	case types.getVar
		// Calling just the request
}