# basic-sails-app

## Installation

Must have docker installed.

Clone the repository and run the following commands under your project root:

Initialize containers:

(replace path d:/development... with path to project root)
```shell
npm install
docker build -t basic-sails-app .
docker run --name basic-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=basic_sails_app_development -d mysql:latest
docker run -p 3000:3000 -v D:/development/js/sails/basic-sails-app:/usr/src --name basic-sails-app -e CHIPHER_JWT_SECRET_KEY=someKey -e HASH_PASSWORD=someHashPassword -e GREENAUTO_DB_PASSWORD=password -i -t basic-sails-app bash
```

If containers allready initialized:
```
docker start basic-mysql basic-sails-app
```

Connect to container:
```
docker exec -i -t basic-sails-app bash
```
For tests
Create test database schema with name from connect.js (default basic_sails_app_test).

 ( in docker bash)
```shell
npm i istanbul mocha -g
npm test
```
## Documentation
```
http://localhost:3000/documentation
```
