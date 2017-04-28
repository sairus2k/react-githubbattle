import axios from 'axios';

const url = 'https://api.github.com';

const api = {
  battle(players) {
    return axios.all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError);
  },
  fetchPopularRepos(language) {
    const encodedURI = window.encodeURI(
      `${url}/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
    );
    return axios.get(encodedURI).then((response) => response.data.items);
  }
};

export default api;

function getProfile(username) {
  return axios.get(`${url}/users/${username}`).then(user => user.data);
}

function getRepos(username) {
  return axios.get(`${url}/users/${username}/repos?per_page=100`).then(repos => repos.data);
}

function getStarCount(repos) {
  return repos.reduce((count, repo) => count + repo.stargazers_count, 0);
}

function caclScore(profile, repos) {
  const {followers} = profile;
  const totalStars = getStarCount(repos);
  return (followers * 3) + totalStars;
}

function handleError(error) {
  console.warn(error);
  return null;
}

function getUserData(player) {
  return axios.all([
    getProfile(player),
    getRepos(player)
  ]).then(data => {
    const [profile, repos] = data;
    return {
      profile,
      score: caclScore(profile, repos)
    }
  });
}

function sortPlayers(players) {
  return players.sort((a, b) => b.score - a.score);
}
