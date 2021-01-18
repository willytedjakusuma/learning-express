
const express = require('express');
const router = express.Router();
const Joi = require('joi');

const httpCode = {
  success: 200,
  badRequest: 400,
  notFound: 404
}

let courses = [
  { id: 1, name: 'Math'},
  { id: 2, name: 'Physics'},
  { id: 3, name: 'English Literature'},
];


// Router log on user
router.use((req, res, next) => {
  const log = {
    url: req.originalUrl,
    hostname: req.hostname,
    timestamp: new Date(Date.now()),
    author: req.ip,
    data: {
      params: req.params,
      body: req.body
    }
  }
  console.log(log);
  next();
})

router.route('/')
    .get((req, res) => {
      if (!courses) return res.status(httpCode.notFound).send(`Courses data is not found...`);
      res.send(courses);
    }) // Get all data
    .post((req, res) => {
      const { error } = validateCourse(req.body);
      if (error) return res.status(httpCode.badRequest).send(error.details[0].message);
    
      const newCourse = { 
        id: ++courses.length, 
        name: req.body.name 
      };
    
      courses.push(newCourse);
      res.send(newCourse)
    }); // Insert Data

router.route('/:id')
  .get((req, res) => {
    const course = courses.find ( c => c.id === parseInt(req.params.id) );
    if (!course) return res.status(httpCode.notFound).send(`Course with id ${req.params.id} is not found...`);
    res.send(course);
  }) // Get Single Data
  .put((req, res) => {
    const course = courses.find ( c => c.id === parseInt(req.params.id) );
    if (!course) return res.status(httpCode.notFound).send(`Course with id ${req.params.id} is not found...`);

    const { error } = validateCourse(req.body);
    if (error) return res.status(httpCode.badRequest).send(error.details[0].message);

    course.name = req.body.name;
    res.send(course);
  }) // Update Data
  .delete((req, res) => {
    const course = courses.find ( c => c.id === parseInt(req.params.id) );
    if (!course) return res.status(httpCode.notFound).send(`Course with id ${req.params.id} is not found...`);

    const index = courses.indexOf(course)

    courses.splice(index);
    res.send(course);
  }); // Delete Data


function validateCourse(course) {
  // Validating user input
  // using Joi library
  // npm -i joi
  const schema = Joi.object({ 
    name: Joi.string().min(3).required()
  });

  return schema.validate(course)
}
  
module.exports = router;
