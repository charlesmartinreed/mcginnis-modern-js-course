var React = require('react');
var Popular = require('./Popular');

var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;

var Nav = require('./Nav');
var Home = require('./Home');
var Battle = require('./Battle');
var Results = require('./Results');

// in the Switch component, if all other routes aren't active, the page path isn't a page we serve up. Instead we render 'Not Found'
class App extends React.Component {
		/* render Router, set components to be rendered only at specific paths */
	render() {
		return (
			<Router>
			<div className="container">
				<Nav />
				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/battle' component={Battle} />
					<Route path='/battle/results' component={Results} />
					<Route path='/popular' component={Popular} />
					<Route render={function() {
						return <p>Not Found</p>
					}} />
				</Switch>
			</div>
			</Router>
		)
	}
}

// since this is an ES5 version, we're using common JS
module.exports = App;
