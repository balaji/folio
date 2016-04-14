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

## Important
If you are running this build locally, 
* you need to create a facebook app here: [https://developers.facebook.com/apps/](https://developers.facebook.com/apps) and edit the appId [here](https://github.com/balaji/folio/tree/master/config).

* Create a `.env` file with APP_SECRET and REDIS_URL on the root folder, like this:
```
APP_SECRET=app_secret_from_facebook_app
REDIS_URL=redis://localhost:6379
```

Alternatively you can try the latest build here: [https://folioweb.herokuapp.com/](https://folioweb.herokuapp.com/).

## Steps:

The redis server instance should be running.
```
$ npm install
$ ./node_modules/.bin/bower install
$ ./node_modules/.bin/webpack
$ npm start
```
Visit [http://localhost:5000/](http://localhost:5000/)

