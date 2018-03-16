import actionCreatorCreator from './actionCreatorCreator';

const snakeToCamelCase = (str) => (
	str.toLowerCase().replace(/_\w/g, (match) => match[1].toUpperCase())
);

class Action {
	constructor (type) {
		this.type = type;
	}

	toString () {
		return this.type
	}
}

const createAllActionsFromTypes = (types) => Object.keys(types).reduce((actions, typeName) => ({
	...actions,
	[snakeToCamelCase(typeName)]: actionCreatorCreator(types[typeName]),
}), {});

export const generateActions = (types) => Object.keys(types).reduce((actions, typeName) => ({
	...actions,
	[snakeToCamelCase(typeName)]: actionCreatorCreator(types[typeName]),
}), {});



export default generateActions;