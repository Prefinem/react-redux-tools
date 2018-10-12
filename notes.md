get all -> GET /posts
	query params
		from:
		to:
		search:
create one -> POST /posts
get one -> GET /posts/{number}
update one -> PUT /posts/{number}
delete one -> DELETE /posts/{number}

/posts/{number}/comments
/posts/{number}/comments/{number}



redux-saga-tools

react-redux-saga-api

react-redux-tools
	actions/
	reducers/
	types/
	sagas/
		helpers/
		api/
		index.js
	selectors/


react-redux-modules
	scaffolding tool to create layout for a react-redux-modules including actions, reduces, sagas, types and components

	Super High Order Components with redux built in

	Creating a High Order Component with it's own redux state branch for resuability and extensibility

	WTF Does that mean?  With a redux state branch, you can create High Order Components that can be modified by redux state for faster and more optimized to React

	Being able to use the power of redux and redux sagas in an extensible way to share complex modules between different apps without

	Allows us to reuse complex shit in real apps in a way that is simple to integrate and is not a black box and keeps us from using the anti patter of context.  It also gives the parent app, or other subsiquent modules insight into the module.  It gives an easy way to communicate between the main app, and other modules by looking at redux state and actions instead of looking at the internal apis of the high order components.

	Combining the idea of High Order Components with Redux State

	Creates a really good hoook for webpack codesplitting
	Creates a very standard file system organization for maintain a complex app with multiple complex apps inside

	Creates a pattern for large react applications


	RRM CLI allows you to show all actions / types




import Modal from './modules/Modal';

modules/Modal/index.js ->
	export default as Modal from './components/Modal';


import modal from './modules/Modal/redux';