'use strict';
const pug = require('pug');
const {Client} = require('pg');

const contents = [];
const crypto = require("crypto");

function handleLogout(req, res) {
  res.writeHead(401,{
    'Content-Type' : 'text/plain; charset=utf-8'
  });
  res.end('ログアアウトしました');
}

function handleNotFound(req, res)
{
  function createClient(){
    //usersが存在しない
      return  new Client({
      user:'postgres',
      host: 'localhost',
      database: 'test',
      password: 'postgres',
      port: 5432
    });
  };

  function sqlProcessing(sqlstr,mode){
    console.log(sqlstr);
    //sqlstr = sqlstr.replace(/--?.*/g,"");
    //console.log(sqlstr);
    const client = createClient();

    client.connect().then(connect => 
      client.query(sqlstr).then(clientRes => {
        //console.log(clientRes.rows[0].name);
        //str = clientRes.rows[0].name;
        
        res.writeHead(200, {
          'Content-Type': 'text/html; charset=utf-8'
        });
        if(mode==='SELECT')
        {
          var str = clientRes.rows[0];
          //res.write(pug.renderFile('./views/posts.pug', {contents: clientRes.rows}));
        }
        switch(mode){
          case 'toko':
            break;
          case 'SELECT':
            res.write(pug.renderFile('./views/posts.pug', {contents: clientRes.rows}));
            break;
          case 'search':
            console.log("clientRes: "+clientRes.rows[0].email);
            //res.write(pug.renderFile('./views/posts.pug', {contents: clientRes.rows}));
            break;
        }

        
        }).catch(e => 
          console.error(e.stack)
          ).finally((cR) => {
            res.end();
          })
    );
  }
  var user = req.url.split('/')[2];

  if(req.url.split('/')[1]!=='posts')
  {
    res.writeHead(404,{
      'Content-Type' : 'text/plain; charset=utf-8'
    });
    res.end('ページが見つかりません');
  }
  else
  {
  switch(req.method){
    case 'GET':
      res.writeHead(200,{
        'Content-Type': 'text/html; charset=utf-8'
      });
      const decoded = decodeURIComponent(user);

       //hoge' AND email = 'name' OR 'x' = 'x';--
      const sqlstr = `SELECT * FROM secret_usesrs WHERE name='${decoded}'`;
      console.log("ここから:"+decoded+"ここまで");
      sqlProcessing(sqlstr,'SELECT');
      break;
    default:
      res.writeHead(404,{
        'Content-Type' : 'text/plain; charset=utf-8'
      });
      res.end('ページが見つかりません');
      break;
  }
  }
}

module.exports = {
  handleLogout: handleLogout,
  handleNotFound : handleNotFound
};