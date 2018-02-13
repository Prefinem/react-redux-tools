/* global test, expect */

const actionTypes = require('./../../dist/models/actionTypes');

test('create all types for base type', async () => {
	await expect(actionTypes.generateTypes('app', ['set_var'])).toEqual({
		SET_VAR_FAILURE: 'app/SET_VAR_FAILURE',
		SET_VAR_REQUEST: 'app/SET_VAR_REQUEST',
		SET_VAR_SUCCESS: 'app/SET_VAR_SUCCESS',
	});
});