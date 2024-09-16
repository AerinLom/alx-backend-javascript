const http = require('http');
const fs = require('fs');

const PORT = 1245;
const HOST = 'localhost';
const DB_FILE = process.argv[2] || '';

const countStudents = (dataPath, callback) => {
  if (!dataPath) return callback(new Error('Cannot load the database'));

  fs.readFile(dataPath, 'utf-8', (err, data) => {
    if (err) return callback(new Error('Cannot load the database'));

    const reportParts = [];
    const fileLines = data.trim().split('\n');
    const studentGroups = {};
    const [headers, ...rows] = fileLines;
    const dbFieldNames = headers.split(',');
    const studentPropNames = dbFieldNames.slice(0, -1);

    rows.forEach((line) => {
      const studentRecord = line.split(',');
      const studentPropValues = studentRecord.slice(0, -1);
      const field = studentRecord.slice(-1)[0];
      if (!studentGroups[field]) studentGroups[field] = [];
      const studentEntries = studentPropNames.map((propName, idx) => [propName, studentPropValues[idx]]);
      studentGroups[field].push(Object.fromEntries(studentEntries));
    });

    const totalStudents = Object.values(studentGroups).reduce((total, group) => total + group.length, 0);
    reportParts.push(`Number of students: ${totalStudents}`);
    for (const [field, group] of Object.entries(studentGroups)) {
      reportParts.push(`Number of students in ${field}: ${group.length}. List: ${group.map((student) => student.firstname).join(', ')}`);
    }

    callback(null, reportParts.join('\n'));
  });
};

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    countStudents(DB_FILE, (err, report) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Error: ${err.message}`);
      } else {
        res.end(`This is the list of our students\n${report}`);
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});

module.exports = server;
