# greenauto-backend

## Installation

Must have docker installed.

Clone the repository and run the following commands under your project root:

Initialize containers: 

(replace path d:/development... with path to project root)
```shell
npm install
docker build -t greenauto-backend .
docker run --name greenauto-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=greenauto_development -d mysql:latest
docker run -p 3000:3000 -v D:/development/js/sails/greenauto-backend:/usr/src --name greenauto-backend -e CHIPHER_JWT_SECRET_KEY=someKey -e HASH_PASSWORD=someHashPassword -e GREENAUTO_DB_PASSWORD=password -i -t greenauto-backend bash
```

If containers allready initialized:
```
docker start greenauto-mysql greenauto-backend
```

Connect to container:
```
docker exec -i -t greenauto-backend bash
```
For tests
Create test database schema with name from connect.js (default greenauto_test).

 ( in docker bash)
```shell
npm i istanbul mocha -g
npm test
```
## Documentation
```
http://localhost:3000/documentation
```
