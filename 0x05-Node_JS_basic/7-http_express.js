const express = require('express');
const fs = require('fs');

const app = express();
const PORT_NUMBER = 1245;
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
        const groups = {};
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
          if (!Object.keys(groups).includes(category)) {
            groups[category] = [];
          }
          const entries = studentFields.map((fieldName, index) => [
            fieldName,
            fieldValues[index],
          ]);
          groups[category].push(Object.fromEntries(entries));
        }

        const totalStudentCount = Object.values(groups).reduce(
          (previous, current) => (previous || []).length + current.length,
        );
        reportLines.push(`Number of students: ${totalStudentCount}`);
        for (const [category, students] of Object.entries(groups)) {
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

app.get('/', (_, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (_, res) => {
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
});

app.listen(PORT_NUMBER, () => {
  console.log(`Server listening on PORT ${PORT_NUMBER}`);
});

module.exports = app;
