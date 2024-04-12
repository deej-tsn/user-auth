# UserAuth

### Welcome to the User Authenication Site

This project will demonstrate how a modern application may build a robust user authenication system. It is intended to be both educational and thought provoking regarding the tradeoff that websites make.

## Summary 

Using a simple user blog type application as a basis, we will be building the user authenication. This involves creating users, loginning in users, storing passwords, generating json web tokens to give recent users auto login.

Thus this project is very backend focused and so little consideration is given to the frontend ui and html. 

## Set Up

Current the only way to experience the project is to run it locally. 

Therefore you can either run the code directly after making some adjustments or run the docker containers.

I recommend using the Docker containers as the project requires several applications ( Golang, Node.js, NPM, MySQL ) and so there can be complications between versions of each application.

### Direct Installation

#### SQL Set Up

- Install [MySQL community version](https://dev.mysql.com/downloads/mysql/) and follow setup guide.
- Note down:
    - HOST address (most likely 127.0.0.1/localhost)
    - PORT address (default is 3306)
    - PASSWORD
    - ADMIN (default is root)

- Using sourcedb.sql file located in /sql folder, create the database and all the tables.

#### Backend Set Up

- Install [Golang](https://go.dev/doc/install) and check for global accessablity from terminal with `go version`. 
- choose a secret key for encrytion ( your choice )
- create .env file in /backend folder
- write the following into .env file 
``` 
HOST = [HOST address]
PORT = [PORT address]
PASSWORD = [Password]
ADMIN = [ADMIN]
SECRET_KEY = [SECRET KEY]
DBNAME = userauth
```
- start the backend webserver using ` go run .` in the terminal ( ensure you are in the backend folder location in terminal). 
- server now running on port 1323 

#### Frontend Set Up

- Install [Node.js and Npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and check for global accessablity from terminal with ` node -v ` and `npm -v `.
- change directory to /frontend.
- run `npm install`
- run `npm run dev` 
- website should run on localhost:8080

### Docker Version

#### Still working on getting docker containers working. Sorry for inconviences.

## Project Overview