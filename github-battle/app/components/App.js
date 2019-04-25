const React = require('react');
const Popular = require('./Popular');

const ReactRouter = require('react-router-dom');
const Router = ReactRouter.BrowserRouter;
const Route = ReactRouter.Route;
const Switch = ReactRouter.Switch;

const Nav = require('./Nav');
const Home = require('./Home');
const Battle = require('./Battle');
const Results = require('./Results');

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
					<Route render={() => (
						<p>Not Found</p>
					)} />
				</Switch>
			</div>
			</Router>
		)
	}
}

// since this is an ES5 version, we're using common JS
module.exports = App;
