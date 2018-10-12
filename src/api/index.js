/* global fetch */
import 'isomorphic-fetch';

const fetchAPI = (method, url, payload, options = {}) => { // eslint-disable-line max-params
	const request = {
		...options,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			...options.headers,
		},
		method: method.toUpperCase(),
	};

	if (payload && method.toUpperCase() !== 'GET') {
		request.body = JSON.stringify(payload);
	}

	return fetch(url, request);
};

const fetchJSON = (method, url, payload, options) => ( // eslint-disable-line max-params
	fetchAPI(method, url, payload, options)
		.then((response) => response.json())
		.catch((error) => {
			throw error;
		})
);

const fetchHTML = (method, url, payload, options) => ( // eslint-disable-line max-params
	fetchAPI(method, url, payload, options)
		.then((response) => response.text())
		.catch((error) => {
			throw error;
		})
);

const api = function *api (method, url, payload, options) { // eslint-disable-line max-params
	return yield fetchJSON(method, url, payload, options);
};

export const html = function *html (method, url, payload) {
	return yield fetchHTML(method, url, payload);
};

export const get = function *get (url) {
	return yield api('GET', url, null);
};

export const post = function *post (url, payload, options) {
	return yield api('POST', url, payload, options);
};

export const put = function *put (url, payload, options) {
	return yield api('PUT', url, payload, options);
};

export const remove = function *remove (url, payload, options) {
	return yield api('DELETE', url, payload, options);
};

export const urlEncodeParams = (params) => Object.keys(params)
	.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
	.join('&');

export default {
	get,
	html,
	post,
	put,
	remove,
};
