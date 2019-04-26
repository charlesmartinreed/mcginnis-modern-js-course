//async/await is supported via @babel/polyfill

import axios from 'axios';

// github id stuff, in case you find yourself being rate limited
const id = "YOUR_CLIENT_ID";
const sec = "YOUR_SECRET_ID";
// const params = `?client_id=${id}&client_secret=${sec}`;

async function getProfile(username) {
	const profile = await axios.get(`https://api.github.com/users/${username}`);
	return profile.data;
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
async function getUserData(player) {
	const [ profile, repos ] = await Promise.all([
		getProfile(player),
		getRepos(player)
	])

	return {
		profile,
		score: calculateScore(profile, repos)
	}
}


function sortPlayers(players) {
	return players.sort((a, b) => b.score - a.score)
}

export async function battle (players) {
	const results = await Promise.all(players.map(getUserData))

	try {
		return results === null ? results : sortPlayers(results);
	} catch (error) {
		handleError(error)
	}
}

export async function fetchPopularRepos(language) {
	const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);

	const repos = await axios.get(encodedURI)

	try {
		return repos.data.items;
	} catch (error) {
		handleError(error)
	}

}
