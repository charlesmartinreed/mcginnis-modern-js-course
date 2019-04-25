const React = require('react');
const PropTypes = require('prop-types');
const api = require('../utils/api');
const Loading = require('./Loading');

// stateless functional component
function SelectLanguage( { selectedLanguage, onSelect} ) {
	const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

	return (
		<ul className="languages">

			{languages.map((lang) => (
					<li
						style={lang === selectedLanguage ? { color: '#d0021b'} : null }
						key={lang}
						onClick={() => onSelect(lang)}
					>
						{lang}
					</li>
				))}
		</ul>
	)
}

function RepoGrid({repos}) {
	return (
		<ul className="popular-list">
			{repos.map(({ name, owner, stargazers_count, html_url}, index) => (
					<li key={name} className="popular-item">
						<div className="popular-rank">#{index + 1}</div>
						<ul className="space-list-items">
							<li>
								<img className="avatar" src={owner.avatar_url} alt={'Avatar for ' + owner.login} />
							</li>
							<li><a href={html_url}>{name}</a></li>
							<li>@{owner.login}</li>
							<li>{stargazers_count} stars</li>
						</ul>
					</li>
				))}
		</ul>
	)
}

/* PROPTYPES */
SelectLanguage.propTypes = {
	selectedLanguage: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired
}

RepoGrid.propTypes = {
	repos: PropTypes.array.isRequired
}

class Popular extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedLanguage: 'All',
			repos: null
		}
		/* remember that update lanuage is not automagically bound to the this keyword that corresponds to our Popular component instance. Now it is.*/
		this.updateLanguage = this.updateLanguage.bind(this);
	}

	componentDidMount() {
		/* This lifecycle event is where you'll want to make any AJAX requests */
		this.updateLanguage(this.state.selectedLanguage);
	}

	updateLanguage(lang) {
		this.setState(() =>({ selectedLanguage: lang, repos: null}))

		/* again, because we're making another function inside of then, the 'this' in this.setState won't be what we might expect. We bind to tell the function which 'this' should apply here */
		api.fetchPopularRepos(lang)
		.then((repos) => this.setState(() => ({ repos })));
}

	render() {
		const { selectedLanguage, repos } = this.state;
		return (
			<div>
				<SelectLanguage
					selectedLanguage={selectedLanguage}
					onSelect={this.updateLanguage}
				/>
				{!repos ? <Loading /> : <RepoGrid repos={repos} />}
			</div>
		)
	}
}

module.exports = Popular;
