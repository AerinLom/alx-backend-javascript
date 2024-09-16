const http = require('http');
const fs = require('fs').promises;

const PORT = 1245;
const HOST = 'localhost';
const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';

const countStudents = async (dataPath) => {
  if (!dataPath) throw new Error('Cannot load the database');

  try {
    const data = await fs.readFile(dataPath, 'utf-8');
    const reportParts = [];
    const fileLines = data.trim().split('\n');
    const studentGroups = {};
    const dbFieldNames = fileLines[0].split(',');
    const studentPropNames = dbFieldNames.slice(0, -1);

    for (const line of fileLines.slice(1)) {
      const studentRecord = line.split(',');
      const studentPropValues = studentRecord.slice(0, -1);
      const field = studentRecord.slice(-1)[0];
      if (!studentGroups[field]) studentGroups[field] = [];
      const stuEntrs = studentPropNames.map((propName, idx) => [propName, studentPropValues[idx]]);
      studentGroups[field].push(Object.fromEntries(stuEntrs));
    }

    const totalStu = Object.values(studentGroups).reduce((sum, group) => sum + group.length, 0);
    reportParts.push(`Number of students: ${totalStu}`);
    for (const [field, group] of Object.entries(studentGroups)) {
      reportParts.push(
        `Number of students in ${field}: ${group.length}. `
        + `List: ${group.map((student) => student.firstname).join(', ')}`,
      );
    }
    return reportParts.join('\n');
  } catch (err) {
    throw new Error('Cannot load the database');
  }
};

const SERVER_ROUTE_HANDLERS = [
  {
    route: '/',
    handler(_, res) {
      const responseText = 'Hello Holberton School!';
      res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Content-Length': responseText.length,
      });
      res.end(responseText);
    },
  },
  {
    route: '/students',
    async handler(_, res) {
      const responseParts = ['This is the list of our students'];

      try {
        const report = await countStudents(DB_FILE);
        responseParts.push(report);
        const responseText = responseParts.join('\n');
        res.writeHead(200, {
          'Content-Type': 'text/plain',
          'Content-Length': responseText.length,
        });
        res.end(responseText);
      } catch (err) {
        responseParts.push(err.message);
        const responseText = responseParts.join('\n');
        res.writeHead(200, {
          'Content-Type': 'text/plain',
          'Content-Length': responseText.length,
        });
        res.end(responseText);
      }
    },
  },
];

const app = http.createServer((req, res) => {
  const routeHandler = SERVER_ROUTE_HANDLERS.find((rh) => rh.route === req.url);
  if (routeHandler) routeHandler.handler(req, res);
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

app.listen(PORT, HOST, () => {
  console.log(`Server listening at http://${HOST}:${PORT}`);
});
