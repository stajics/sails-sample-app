# basic-sails-app

##### Features:
* docker (https://www.docker.com/)
* eslint-config-airbnb linting. (https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)
* passport.js authorization (JWT)  (http://passportjs.org/)
* swagger documentation (http://swagger.io/)
* mocha tests, istanbul cover test
* babel

##### Description:
Sails.js boilerplate with User CRUD and authorization. Using MySQL database.

## Installation

Must have docker installed. (https://www.docker.com/)

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
