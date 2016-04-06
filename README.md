# folio
Experimental node.js app for managing Facebook pages.

## Tech stack
* Express JS with Jade template as backend framework.
* Redis for session management
* Angular JS 1.4.x with [Rdash](https://github.com/rdash/rdash-angular) as frontend framework
* Facebook Web API and JavaScript SDK
* Webpack as module bundler.
* NPM for backend and bower for frontend dependencies management.

## Pre-requisites
* nodejs
* npm
* redis-server

## Steps:

The redis server instance should be running on localhost.
```
$ npm install
$ ./node_modules/.bin/bower install
$ ./node_modules/.bin/webpack
$ npm start
```
Visit [http://localhost:5000/](http://localhost:5000/)

