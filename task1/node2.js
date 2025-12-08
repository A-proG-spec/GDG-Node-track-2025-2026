import http from 'http';

let students = [];
let nextId = 1;

const server = http.createServer ((req, res) => {
  if (req.url === '/students') {
    return res.end (JSON.stringify (students));
  }

  if (req.method === 'POST' && req.url === '/students') {
    let body = '';
    req.on ('data', chunk => (body += chunk));
    req.on ('end', () => {
      try {
        const data = JSON.parse (body);
        if (!data.name) {
          return res.end (JSON.stringify ({error: 'Name is required'}));
        }
        const newStudent = {
          id: nextId++,
          name: data.name,
        };
        students.push (newStudent);
        res.end (JSON.stringify (newStudent));
      } catch (error) {
        res.end (JSON.stringify ({error: 'Invalid JSON'}));
      }
    });

    return;
  }
  if (req.method === 'PUT' && req.url.startsWith ('/students/')) {
    const id = Number (req.url.split ('/')[2]);
    let body = '';
    req.on ('data', chunk => (body += chunk));
    req.on ('end', () => {
      try {
        const data = JSON.parse (body);
        const student = students.find (s => s.id === id);

        if (!student) {
          return res.end (JSON.stringify ({error: 'Student not found'}));
        }

        student.name = data.name || student.name;
        res.end (JSON.stringify (student));
      } catch (error) {
        res.end (JSON.stringify ({error: 'Invalid JSON'}));
      }
    });
    return;
  }

  if (req.method === 'DELETE' && req.url.startsWith ('/students/')) {
    const id = Number (req.url.split ('/')[2]);
    const index = students.findIndex (s => s.id === id);

    if (index === -1) {
      return res.end (JSON.stringify ({error: 'Student not found'}));
    }

    students.splice (index, 1);
    return res.end (JSON.stringify ({message: 'Student deleted'}));
  }

  res.end (JSON.stringify ({error: 'Route not found'}));
});

server.listen (4000, () => {
  console.log ('server is running on port 4000');
});
