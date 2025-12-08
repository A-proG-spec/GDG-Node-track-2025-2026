import {error} from 'console';
import http from 'http';
let students = [{id: 1, name: 'anteneh'}, {id: 2, name: 'kebede'}];
let nextId = 3;

const server = http.createServer ((req, res) => {
  if (req.method === 'POST' && req.url === '/students') {
    let body = '';
    req.on ('data', chunk => (body += chunk));
    req.on ('end', () => {
      try {
        const data = JSON.parse (body);
        if (!data.name) {
          return res.end (JSON.stringify ({error: 'name is empty'}));
        }
        let newStudent = {
          id: nextId++,
          name: data.name,
        };
        students.push (newStudent);
        res.end (JSON.stringify (newStudent));
      } catch (error) {
        res.end (JSON.stringify ({error: 'Invalid json'}));
      }
    });
  } else if (req.method === 'GET' && req.url === '/') {
    res.writeHead (200);
    res.end (JSON.stringify (students));
  } else if (req.method === 'PUT' && req.url.startsWith ('/students/')) {
    let id = Number (req.url.split ('/')[2]);
    let body = '';
    req.on ('data', chunk => (body += chunk));
    req.on ('end', () => {
      try {
        const data = JSON.parse (body);
        let student = students.find (s => s.id === id);
        if (!student) {
          return res.end (JSON.stringify ({error: 'no student found'}));
        }
        student.name = data.name;
        res.end (JSON.stringify (student));
      } catch (error) {
        res.end (JSON.stringify ({error: 'invalid json'}));
      }
    });
  } else if (req.method === 'DELETE' && req.url.startsWith ('/students/')) {
    const id = Number (req.url.split ('/'[2]));
    const index = students.findIndex (s => s.id === id);
    if (!index) {
      return res.end (
        JSON.stringify ({error: 'student with this id is not found'})
      );
    }
    students.splice (index, 1);
    return res.end (JSON.stringify ({message: 'student deleted succesfully'}));
  } else {
    res.writeHead (404);
    res.end ('404 page not found');
  }
});

server.listen (4000, () => {
  console.log ('server is listening');
});
