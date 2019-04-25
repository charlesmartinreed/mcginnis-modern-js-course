const React = require('react');
const queryString = require('query-string');
const api = require('../utils/api');
const Link = require('react-router-dom').Link;
const PropTypes = require('prop-types');
const PlayerPreview = require('./PlayerPreview');
const Loading = require('./Loading');

function Profile({info}) {
	const { name, location, company, followers, following, public_repos, blog } = info;

	return (
		<PlayerPreview
			avatar={info.avatar_url}
			username={info.login}
		>
			<ul className='space-list-items'>
				{name && <li>{name}</li>}
				{location && <li>{location}</li>}
				{company && <li>{company}</li>}
				<li>Followers: {followers}</li>
				<li>Following: {following}</li>
				<li>Public Repos: {public_repos}</li>
				{blog && <li><a href={blog}>{blog}</a></li>}
			</ul>
		</PlayerPreview>
	)
}

Profile.propTypes = {
	info: PropTypes.object.isRequired
}

function Player({ label, score, profile }) {
	return (
		<div>
			<h1 className="header">{label}</h1>
			<h3 style={{textAlign: 'center'}}>Score: {score}</h3>
			<Profile info={profile}/>
		</div>
	)
}

Player.propTypes = {
	label: PropTypes.string.isRequired,
	score: PropTypes.number.isRequired,
	profile: PropTypes.object.isRequired
}

class Results extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			winner: null,
			loser: null,
			error: null,
			loading: true
		}
	}

	componentDidMount() {
		const { playerOneName, playerTwoName} = queryString.parse(this.props.location.search);

		api.battle([
			playerOneName,
			playerTwoName
		])
			.then((players) => {
				if (players === null) {
					return this.setState(() => ({
							error: 'Looks like there was an error. Check that both users exist on Github',
							loading: false
						}));
				}

				this.setState(() => ({
						error: null,
						winner: players[0],
						loser: players[1],
						loading: false
				}));
			});
	}

	render() {
		var { error, winner, loser, loading } = this.state;

		if (loading) {
			return <Loading />
		}

		if (error) {
			return (
				<div>
					<p>{error}</p>
					<Link to='/battle'>Reset</Link>
				</div>
			)
		}

		return (
			<div className="row">
				<Player
					label="Winner"
					score={winner.score}
					profile={winner.profile}
				/>
				<Player
					label="Loser"
					score={loser.score}
					profile={loser.profile}
				/>
			</div>
		)
	}
}

module.exports = Results;
