const http = require('http');
const fs = require('fs');

const PORT_NUMBER = 1245;
const HOSTNAME = 'localhost';
const app = http.createServer();
const DATABASE_FILE = process.argv.length > 2 ? process.argv[2] : '';

const countStudents = (filePath) => new Promise((resolve, reject) => {
  if (!filePath) {
    reject(new Error('Cannot load the database'));
  }
  if (filePath) {
    fs.readFile(filePath, (error, fileData) => {
      if (error) {
        reject(new Error('Cannot load the database'));
      }
      if (fileData) {
        const reportLines = [];
        const lines = fileData.toString('utf-8').trim().split('\n');
        const studentGroups = {};
        const headerFields = lines[0].split(',');
        const studentFields = headerFields.slice(
          0,
          headerFields.length - 1,
        );

        for (const line of lines.slice(1)) {
          const record = line.split(',');
          const fieldValues = record.slice(
            0,
            record.length - 1,
          );
          const category = record[record.length - 1];
          if (!Object.keys(studentGroups).includes(category)) {
            studentGroups[category] = [];
          }
          const entries = studentFields.map((fieldName, index) => [
            fieldName,
            fieldValues[index],
          ]);
          studentGroups[category].push(Object.fromEntries(entries));
        }

        const totalStudentCount = Object.values(studentGroups).reduce(
          (previous, current) => (previous || []).length + current.length,
        );
        reportLines.push(`Number of students: ${totalStudentCount}`);
        for (const [category, students] of Object.entries(studentGroups)) {
          reportLines.push([
            `Number of students in ${category}: ${students.length}.`,
            'List:',
            students.map((student) => student.firstname).join(', '),
          ].join(' '));
        }
        resolve(reportLines.join('\n'));
      }
    });
  }
});

const ROUTE_HANDLERS = [
  {
    route: '/',
    handler(_, res) {
      const responseText = 'Hello Holberton School!';

      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', responseText.length);
      res.statusCode = 200;
      res.write(Buffer.from(responseText));
    },
  },
  {
    route: '/students',
    handler(_, res) {
      const responseLines = ['This is the list of our students'];

      countStudents(DATABASE_FILE)
        .then((report) => {
          responseLines.push(report);
          const responseText = responseLines.join('\n');
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', responseText.length);
          res.statusCode = 200;
          res.write(Buffer.from(responseText));
        })
        .catch((error) => {
          responseLines.push(error instanceof Error ? error.message : error.toString());
          const responseText = responseLines.join('\n');
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', responseText.length);
          res.statusCode = 200;
          res.write(Buffer.from(responseText));
        });
    },
  },
];

app.on('request', (req, res) => {
  for (const routeHandler of ROUTE_HANDLERS) {
    if (routeHandler.route === req.url) {
      routeHandler.handler(req, res);
      break;
    }
  }
});

app.listen(PORT_NUMBER, HOSTNAME, () => {
  process.stdout.write(`Server listening at -> http://${HOSTNAME}:${PORT_NUMBER}\n`);
});

module.exports = app;
