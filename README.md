# reversi-webapp


## 環境構築

データベースはDockerのコンテナを用いて作成します。

```shell
# コンテナ作成起動する
docker-compose up -d --build
```

```shell
# mysqlコンテナのmysqlにログインする
docker-compose exec  mysql mysql --user=reversi --password=password reversi
```
