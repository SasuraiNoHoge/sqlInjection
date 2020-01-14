'use strict'
const pug = require('pug');
const {Client} = require('pg');

const contents = [];
const crypto = require("crypto");

function handle(req, res){

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

  switch(req.method){
    case 'GET':
      res.writeHead(200,{
        'Content-Type': 'text/html; charset=utf-8'
      });

      //const now = new Date(Date.now());
      //const client = createClient();

      //client.connect().then(connect => 
        //client.query('SELECT * FROM  secret_usesrs where name =$1',["hoge"]).then(clientRes => console.log(clientRes.rows[0])).catch(e => console.error(e.stack)).finally(() => res.end('hi'))
      //);
      const user = 'hoge';
      sqlProcessing(`SELECT * FROM secret_usesrs WHERE name='${user}'`,'SELECT');

      break;
    case 'POST':
      let body = [];
      req.on('data', (chunk) => {
        body += chunk;
      }).on('end', () => {
        console.log(body);
        const decoded = decodeURIComponent(body);
        let content = decoded.split('content=')[1];
        var button = content.split(/&button=/g)[1];
        console.log(button);
        content = content.split(/&button=/g)[0];
        content = content.replace(/\n/g,'<br>');
        content = content.replace(/\+/g,' ');

        const mail = crypto.randomBytes(4).toString('hex');
        console.log(`content: ${content}`);
        //content = `test', 'google@gmail.com)'--`;
        //console.log(`INSERT INTO secret_usesrs VALUES ('${content}', '${mail}@gmail.com')`);
        //sqlProcessing(`INSERT INTO secret_usesrs VALUES ('${content}', '${mail}@gmail.com')`,'INSERT');
        //content = `','');insert into secret_usesrs (name, email) values ('injection', 'injection')--`;

        var sqlstr = "insert into secret_usesrs (name, email) " +"values ('" + content + "','" + mail + "@gmail.com');";
        //console.log(sqlstr);
        if(button === 'search')
        {
          //sqlstr = 'SELECT * FROM secret_usesrs where name="'+content +'";';
          sqlstr = `SELECT * FROM secret_usesrs where name='hoge'`;
          sqlProcessing(sqlstr,button);
        }
        else
        {
          sqlProcessing(sqlstr,button);
        }
        
        //INSERT INTO secret_usesrs(name,email)VALUES('山田','hao123@gmail.com';
        contents.push(content);

        //console.info(`新しい投稿\n${content}`);
        //console.info(`全ての内容\n${contents.join('\n________改行\n')}\n＿＿＿＿＿＿＿終わり\n`);
        handleRedirectPosts(req,res);
        });
      break;
    default:
      break;
  }
}

function handleRedirectPosts(req,res){

  //303は同じパスを見る
  res.writeHead(303,{
    'Location' : '/posts'
  });
  res.end();
}

module.exports = {
  handle
};