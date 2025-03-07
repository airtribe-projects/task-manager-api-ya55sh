# Task management api

## Description

A simple node.js app which allows users to get, create, update and delete tasks. User can also get task by filter based on priority or completion or date of creation.

## Installation

In your terminal

Clone the repo using git clone https://github.com/airtribe-projects/task-manager-api-ya55sh.git

cd to-cloned-location

npm install

start using - node app.js

or with nodemon - npm run start

## Endpoints

GET /tasks - get all tasks or filter by completion or sort by date created at.
curl --request GET 'http://localhost:3000/tasks?completed=true'
curl --request GET 'http://localhost:3000/tasks?sort=createdAt'

GET /tasks/priority/:level - get all the tasks by priority
curl --request GET 'http://localhost:3000/tasks/priority/low'

GET /task/:id - get task based on id
curl --request GET 'http://localhost:3000/task/3'

POST /task - create a new task
curl -X POST 'http://localhost:3000/task' --header 'Content-Type: application/json' --data '{"title": "Running and walking","description": "Some healthy exercise","priority": "high","completed": false}'

PUT /task/:id - update an existing task
curl -X PUT 'http://localhost:3000/task/2' --header 'Content-Type: application/json' --data '{"title": "Running","description": "Marathon preparation","priority": "high","completed": false}'

DELETE /task/:id - delete an existing task
curl -X DELETE 'http://localhost:3000/task/2'
