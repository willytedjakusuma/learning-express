const mysql = require('mysql');

const db = mysql.createConnection({
  host:   'localhost',
  user: 'root',
  password: '',
  database: 'courses',
  port: "3306",
})

let courseData = {};
// Try connection
try {
  db.connect((err) => {
    if (err) throw err;
    console.log('Database connected....');
  })
} catch (error) {
  console.log(error)
}

courseData.fetchData = (id = null) => {
  return new Promise((resolve,reject) => {
    let query = ``;
    if (!id) {
      query = `SELECT * FROM courses`
    } else {
      query = `SELECT * FROM courses WHERE id = ?`
    }
    db.query(query, id, (err, results) => {
      if (err) return reject(err);
      return resolve(results)
    })
  });
}

courseData.insertData = (course) => {
  return new Promise((resolve, reject) => {
    db.query(`INSERT INTO courses SET ?`, course, (err, result) => {
      if (err) return reject(err);
      return resolve(result)
    })
  })
}

courseData.deleteData = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM courses WHERE id = ?`, id, (err, results) => {
      if (err) return reject(err);
      return resolve(results)
    })
  })
}

courseData.updateData = (course) => {
  return new Promise((resolve, reject) => {
    db.query(`UPDATE courses SET ? WHERE id = ?`, [course, course.id], (err, results) => {
      if (err) return reject(err);
      return resolve(results)
    })
  })
}

module.exports = courseData;