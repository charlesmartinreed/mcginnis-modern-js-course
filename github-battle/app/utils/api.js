const axios = require('axios');

// github id stuff, in case you find yourself being rate limited
const id = "YOUR_CLIENT_ID";
const sec = "YOUR_SECRET_ID";
// const params = `?client_id=${id}&client_secret=${sec}`;

function getProfile(username) {
	return axios.get(`https://api.github.com/users/${username}`)
		.then(({data}) => data)
}

function getRepos(username) {
	return axios.get(`https://api.github.com/users/${username}/repos?page=1&per_page=100`)
}

// count is the initialValue, 0 since we passed in '0'
// repo is the array from which we pull our accumulator values
function getStarCount(repos) {
	return repos.data.reduce((count, { stargazers_count }) => count + stargazers_count, 0);
}

function calculateScore({ followers }, repos) {
	return (followers * 3 + getStarCount(repos));
}

function handleError(error) {
	console.warn(error);
	return null;
}

// If we're ging to use Promise, we need a Polyfill because the browser might not have a primitive to which we can attach a Promise - using @babel/polyfill
function getUserData(player) {
	return Promise.all([
		getProfile(player),
		getRepos(player)
	]).then(([ profile, repos]) => ({ profile, score: calculateScore(profile, repos)}));
}


function sortPlayers(players) {
	return players.sort((a, b) => b.score - a.score)
}

module.exports = {
	battle: (players) => {
		return Promise.all(players.map(getUserData))
			.then(sortPlayers)
			.catch(handleError)
	},

	fetchPopularRepos: (language) => {
		const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);

		return axios.get(encodedURI).then(({data}) => data.items);
	}
}
