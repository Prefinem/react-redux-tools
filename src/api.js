import 'isomorphic-fetch';
import { call } from 'redux-saga/effects';

function fetchAPI (method, url, payload, token, options = {}) { // eslint-disable-line max-params
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
}

function fetchJSON (method, url, payload, token, options) { // eslint-disable-line max-params
	return fetchAPI(method, url, payload, token, options)
		.then((response) => response.json())
		.catch((error) => {
			throw error;
		});
}

function fetchHTML (method, url, payload, token, options) { // eslint-disable-line max-params
	return fetchAPI(method, url, payload, token, options)
		.then((response) => response.text())
		.catch((error) => {
			throw error;
		});
}

function getAPI () {
	if (window.api) {
		return window.api;
	}

	return '';
}

function getAPIURL (url) {
	if (url.indexOf('http') > -1) {
		return url;
	}

	return `${getAPI()}${url}`;
}

function *api (method, url, payload, options) { // eslint-disable-line max-params
	const apiURL = getAPIURL(url);
	const response = yield fetchJSON(method, apiURL, payload, token, options);

	return response;
}

export const html = function *html (method, url, payload) {
	const apiURL = getAPIURL(url);
	const response = yield fetchHTML(method, apiURL, payload, token);

	return response;
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
