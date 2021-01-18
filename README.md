Learning Express
===

This repository contains School Course Application REST API backend server using Javascript Language, Running inside NodeJS and using Express Framework. Here are the step to run it:

1. Pull the repository using git clone
``` 
git clone https://github.com/willytedjakusuma/learning-express.git
```

2. Install nodemon for easy use of express server
```
npm install nodemon
```
3. Install NPM Dependencies
```
npm install
```
4. Run the application using nodemon
```
nodemon index.js
```
---

## REST API Tables
| Path      | Method | Description | Request Body |
| ----------| ------ | ----------- | ------------ |
| /api/courses | GET | Get all course data | -
| /api/courses/:id | GET | Get course data based on given course id | -
| /api/courses | POST | Insert new course data | name: String, More than 3 characters
| /api/courses/:id | PUT | Update course data based on given course id | name: String, More than 3 characters
| /api/courses/:id | Delete | Delete data based on given course id | -

