import express from 'express';

const app = express ();
const PORT = 3000;

app.get ('/home', (req, res) => {
  res.send (`
    <h1 style="color: green;">
      Welcome to the Home Page 
    </h1>
  `);
});
app.get ('/about', (req, res) => {
  res.send ('This is the About page of our Express application.');
});

app.get ('/students/:studentId', (req, res) => {
  const {studentId} = req.params;
  const {department} = req.query;

  res.json ({
    studentId,
    department,
    message: 'Student details fetched successfully',
  });
});

app.listen (PORT, () => {
  console.log (`Server running at http://localhost:${PORT}`);
});
