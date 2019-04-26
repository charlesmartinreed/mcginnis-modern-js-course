import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Nav from './Nav';
import Home from './Home';
import Battle from './Battle';
import Popular from './Popular';
import Results from './Results';

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
export default App;
