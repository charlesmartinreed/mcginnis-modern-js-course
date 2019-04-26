import React from 'react';
// named import because we don't care about the entire object, just the NavLink
import { NavLink } from 'react-router-dom';


// NavLink allows you to dynamically style the link based on whether or not the link is active

export default function Nav() {
			/* exact keeps home from being active when using battle, popular paths */
	return (
		<ul className="nav">

			<li>
				<NavLink exact activeClassName='active' to='/'>
					Home
				</NavLink>
			</li>
			<li>
				<NavLink activeClassName='active' to='/battle'>
					Battle
				</NavLink>
			</li>
			<li>
				<NavLink activeClassName='active' to='/popular'>
					Popular
				</NavLink>
			</li>
		</ul>
	)
}
