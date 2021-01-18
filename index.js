
const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Set express application port to match with environment variables
const courseRouter = require('./routes/api/courses')

app.use(express.json()); // JSON data usage in express
app.use('/api/courses', courseRouter);

// Testing Express API
app.get('/', (req, res) => {
  res.send('Hello World!!');
});

app.listen(port, () => console.log(`Listening on port ${port}....`));
