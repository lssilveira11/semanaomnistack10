const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')
const { findConnections, sendMessage } = require('../websocket');

/* controllers normalmente tem 5 funcoes:
- index, show, store, update, destroy
*/

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();
    return res.json(devs)
  },

  async store(req, res) {

    const {
      github_username,
      techs,
      latitude,
      longitude
    } = req.body;

    let dev = await Dev.findOne({
      github_username
    });

    if (!dev) {
      /* quando usa crase numa string, consegue usar variaveis dentro da string */
      const githubRes = await axios.get(`https://api.github.com/users/${github_username}`)

      /* se o name nao existir, vai usar o login como padrao -- ambos estao contidos no apiResponse.data */
      const {
        name = login, avatar_url, bio
      } = githubRes.data;

      const techsArr = parseStringAsArray(techs)

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      }

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArr,
        location
      })

      // aqui tem que filtrar as conexoes e se este Dev que foi cadastrado satisfizer
      // a busca e que estiver ha 10km de distancia, vai enviar esse dev
      const sendSocketMessageTo = findConnections(
        {latitude, longitude}, techsArr 
      );

      console.log(sendSocketMessageTo);
      sendMessage(sendSocketMessageTo, 'new-dev', dev);
    }

    return res.json(dev)
  }
}




/*
console.log(githubRes.data)
{
  login: 'lssilveira11',
  id: 13056348,
  node_id: 'MDQ6VXNlcjEzMDU2MzQ4',
  avatar_url: 'https://avatars0.githubusercontent.com/u/13056348?v=4',
  gravatar_id: '',
  url: 'https://api.github.com/users/lssilveira11',
  html_url: 'https://github.com/lssilveira11',
  followers_url: 'https://api.github.com/users/lssilveira11/followers',
  following_url: 'https://api.github.com/users/lssilveira11/following{/other_user}',
  gists_url: 'https://api.github.com/users/lssilveira11/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/lssilveira11/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/lssilveira11/subscriptions',
  organizations_url: 'https://api.github.com/users/lssilveira11/orgs',
  repos_url: 'https://api.github.com/users/lssilveira11/repos',
  events_url: 'https://api.github.com/users/lssilveira11/events{/privacy}',
  received_events_url: 'https://api.github.com/users/lssilveira11/received_events',
  type: 'User',
  site_admin: false,
  name: 'Lucas Silveira',
  company: 'Sistech Sistemas',
  blog: 'https://twitter.com/lssilveira11',
  location: 'Limeira, SP',
  email: null,
  hireable: null,
  bio: 'A computer scientist that really likes music.',
  public_repos: 6,
  public_gists: 0,
  followers: 1,
  following: 1,
  created_at: '2015-06-25T22:38:04Z',
  updated_at: '2019-12-07T15:32:23Z'
}

*/