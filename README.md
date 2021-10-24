# Backend Scribbr Assignment
This is a simple REST microservice to manage the invoices, as requested from the assignment.
I used Fastify as a framework because is my favorite! It fits very well in the microservice structure that I like to use.

I made two main modules (they are intended to be published in a npm registry):
 - `@spronghi/mongo`: is the wrapper library that injects the mongo instance in the fastify framework, this type of internal library dependency is very usefull so you don't need to handle all the dependencies version in every single project;
 - `@spronghi/server`: is the library that starts the server and manage the server dependencies and connect to the database. I didn't want to make it too complex, but usually is this library that import all the dependency that a microservice needs. Thanks to this library, the only thing that a microservice should handle, is its internal logic. 

The invoices folder contains all the code that implements the REST logic between the `invoices`. A microservice is structured in this way:
 - an `index.js`: this is the entry point of the microservice, it cares about initializing the routes and the collection that the handlers will use;
 - an `handlers.js`: this is the handler of the single api that are exposed by the `index.js`, the core logic is implemented in this module;
 - a `schema.js`: this is the part that exposed the JSON schema of the whole API;
 - a `constants.js`: these are a buntch of constants that I used.

The module `subscriptions.js` is missing because I didn't want to make it too complex. I usually use Redis to make microservices communicate using sub/pub.

I wanted to separate the `invoices` microservice from a microservice that manage only the `contacts` but I didn't have the time for it, also it misses a test suite, which is something that I really care about but I didn't had the time to do it.

Please take in consideration that I took 3 hours to made the backend from scratch.

## Deployed on Heroku
The server is deployed on Heroku at the URL `https://scribbr-assignment-b.herokuapp.com/`. Please consider that is a free subscription so it stays alive only if a request is done every 20/30 seconds, and then, after a request arrives it take some seconds to wake up!

## How to start
There are different ways of running the server

### Configuration
The server needs to connect to an instance of MongoDB to save the data, it searches for the address in the config file named `invoice-v1.json` that has this structure:
``` json
{
  "service": {
    "api": "/api/invoices"
  },
  "mongo": {
    "url": "mongodb://mongo_invoices/test",
    "database": "test"
  }
}
```
It speficy the base API, the port and where to find the MongoDB instance.

### Simple Start
To run it with npm commands just type after having changed the configuration for MongoDB

```
npm install
npm start
```

The server will be available at `http://localhost:3000` depending on the `PORT` environment variable (default is 3000).
Swagger is available at the URL `http://localhost:3000/documentation/static/index.html`.

### Docker
You can run it using `docker` running the command

```
docker-compose build
docker-compose up
```

In this case, an instance of MongoDB will be executed.
The server will be available at `http://localhost:3000` depending on the port that you specified on the `docker-compose.yml` file (default is 3000).
Swagger is available at the URL `http://localhost:3000/documentation/static/index.html`.

## Improvements
Different improvements can be applied.
 - Split the microservice to manage only `invoices` and not `invoices` and `contacts`;
 - Add an instance of Redis to make possible that different microservices could communicate to each other using sub/pub;
 - Test suite.