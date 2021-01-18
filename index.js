
const express = require('express');
const Joi = require('joi');
const app = express();
const port = process.env.PORT || 3000; // Set express application port to match with environment variables
app.use(express.json()); // JSON data usage in express

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

// Testing Express API
app.get('/', (req, res) => {
  res.send('Hello World!!');
});

// Get all data
app.get('/api/courses', (req, res) => {
  if (!courses) return res.status(httpCode.notFound).send(`Courses data is not found...`);
  res.send(courses);
});

// Get single data
app.get('/api/courses/:id', (req, res) => {
  const course = courses.find ( c => c.id === parseInt(req.params.id) );
  if (!course) return res.status(httpCode.notFound).send(`Course with id ${req.params.id} is not found...`);
  res.send(course);
}) ;

// Create ( Insert ) Data
app.post('/api/courses', (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(httpCode.badRequest).send(error.details[0].message);

  const newCourse = { 
    id: ++courses.length, 
    name: req.body.name 
  };

  courses.push(newCourse);
  res.send(newCourse)
})

// Update data
app.put('/api/courses/:id', (req, res) => {
  const course = courses.find ( c => c.id === parseInt(req.params.id) );
  if (!course) return res.status(httpCode.notFound).send(`Course with id ${req.params.id} is not found...`);

  const { error } = validateCourse(req.body);
  if (error) return res.status(httpCode.badRequest).send(error.details[0].message);

  course.name = req.body.name;
  res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find ( c => c.id === parseInt(req.params.id) );
  if (!course) return res.status(httpCode.notFound).send(`Course with id ${req.params.id} is not found...`);

  const index = courses.indexOf(course)

  courses.splice(index);
  res.send(course);
})

app.listen(port, () => console.log(`Listening on port ${port}....`));

function validateCourse(course) {
  const schema = Joi.object({ 
    name: Joi.string().min(3).required()
  });

  return schema.validate(course)
}
