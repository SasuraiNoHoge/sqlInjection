'use strict'
const http = require('http');
const router = require('./lib/router');
const auth = require('http-auth');

//fileで読み込ませる事が可能
const basic = auth.basic({
  realm: 'Enter username and password',
  file: './users.htpassword'
});

//=>はfunctionいらないから無名関数と呼ばれる
//createServerは関数を引数にとる関数
//createServerの返り値はオブジェクトを返す
//なのでserver変数に代入
const server = http.createServer(basic, (req,res) => {
  //router.routeでURLの分岐を見る
  router.route(req,res);
}).on('error', (e) => {
  console.error('Server Error', e);
}).on('clientError', (e) => {
  console.error('Client Error', e);
});

const port = 8000;
server.listen(port, () => {
  console.info(`さーば起動!ポート番号は${port}番です`);
});