var auth = require('basic-auth');

const config = require('../config');
const validUsers = { [config.basicUser] : { name : config.basicUser, password: config.basicUserPwd } }

module.exports = function(request, response, next) {
  var user = auth(request);
  if (!user || !validUsers[user.name] || validUsers[user.name].password !== user.pass) {
    response.set('WWW-Authenticate', 'Basic realm="ktrade User"')
    return response.status(401).send()
  }
  return next()
}