
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const db = require('../../database/database');
const dbServer = require('../../database/database')


const httpCode = {
  success: 200,
  badRequest: 400,
  notFound: 404
}

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
    .get( async (req, res) => {
      let courses = await db.fetchData();
      if (!courses) return res.status(httpCode.notFound).send(`Courses data is not found...`);
      
      res.send(courses);
    }) // Get all data
    .post( async (req, res) => {
      const { error } = validateCourse(req.body);
      if (error) return res.status(httpCode.badRequest).send(error.details[0].message);

      const newCourse = { name: req.body.name };
      let result = await db.insertData(newCourse);
      const payload = {
        id: result.insertId, 
        name: req.body.name
      }
      res.send(payload);
    }); // Insert Data

router.route('/:id')
  .get(async (req, res) => {
    let course = await db.fetchData(parseInt(req.params.id));
    if (!course || course === undefined || course.length == 0) return res.status(httpCode.notFound).send(`Course with id ${req.params.id} is not found...`);

    res.send(course);
  }) // Get Single Data
  .put( async (req, res) => {
    let course = await db.fetchData(parseInt(req.params.id));
    if (!course || course === undefined || course.length == 0) return res.status(httpCode.notFound).send(`Course with id ${req.params.id} is not found...`);

    const { error } = validateCourse(req.body);
    if (error) return res.status(httpCode.badRequest).send(error.details[0].message);

    course[0].name = req.body.name;
    let result = await db.updateData(course[0]);

    res.send(result);
  }) // Update Data
  .delete( async (req, res) => {
    let course = await db.fetchData(parseInt(req.params.id));
    if (!course || course === undefined || course.length == 0) return res.status(httpCode.notFound).send(`Course with id ${req.params.id} is not found...`);

    const payload = course[0];
    let result = await db.deleteData(parseInt(req.params.id))

    res.send(payload);
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
