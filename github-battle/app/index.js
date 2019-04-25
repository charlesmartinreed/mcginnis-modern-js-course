var React = require('react');
var ReactDOM = require('react-dom');
// var PropTypes = require('prop-types');
require('./index.css');
var App = require('./components/App');

ReactDOM.render(
	<App />,
	document.getElementById('app')
)

/*

OFFICIAL DOCUMENTATION:

https://reactjs.org/docs/typechecking-with-proptypes.html

<Component>.propTypes = {
	img: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired
}

<Users>.propTypes = {
	list: PropTypes.arrayOf(PropTypes.object)
}

<Users>.propTypes = {
	list: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string.isRequired,
		friend: PropTypes.bool.isRequired
}))
}


*/
