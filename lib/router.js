'use strict'
const postsHandler = require('./posts-handler');
const util = require('./handler-util');

function route(req, res){
  switch(req.url){
    case '/posts':
      postsHandler.handle(req,res);
      break;
    case '/logout':
      util.handleLogout(req, res);
      break;
    default:
      util.handleNotFound(req, res);
      break;
  }
}
//これを記述することで外部からroute関数を呼び出せる
module.exports = {
  route
};