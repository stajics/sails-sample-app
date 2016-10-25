# greenauto-backend

## Installation

Must have docker installed.

Clone the repository and run the following commands under your project root:


```shell
docker build -t greenauto-backend .
docker run --name greenauto-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=greenauto_development -d mysql:latest
docker run -p 3000:3000 -v D:/development/js/sails/greenauto-backend:/usr/src --name greenauto-backend -e CHIPHER_JWT_SECRET_KEY=someKey -e HASH_PASSWORD=someHashPassword -e GREENAUTO_DB_PASSWORD=password --link greenauto-mysql -it greenauto-backend bash
```

For tests ( in docker bash)
```shell
npm i istanbul mocha -g
npm test
```
## Documentation
```
http://localhost:3000/documentation
```
