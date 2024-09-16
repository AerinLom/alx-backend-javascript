const express = require('express');
const { promises: fs } = require('fs');

const app = express();
const PORT = 1245;
const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';

const countStudents = async (dataPath) => {
  if (!dataPath) {
    throw new Error('Cannot load the database');
  }

  const data = await fs.readFile(dataPath, 'utf-8');
  const reportParts = [];
  const fileLines = data.trim().split('\n');
  const studentGroups = {};
  const dbFieldNames = fileLines[0].split(',');
  const studentPropNames = dbFieldNames.slice(0, dbFieldNames.length - 1);

  fileLines.slice(1).forEach((line) => {
    const studentRecord = line.split(',');
    const studentPropValues = studentRecord.slice(0, studentRecord.length - 1);
    const field = studentRecord[studentRecord.length - 1];
    if (!studentGroups[field]) {
      studentGroups[field] = [];
    }
    const stuEntrs = studentPropNames.map((propName, idx) => [propName, studentPropValues[idx]]);
    studentGroups[field].push(Object.fromEntries(stuEntrs));
  });

  const totalStudents = Object.values(studentGroups)
    .reduce(
      (pre, cur) => (pre || []).length + cur.length,
      0,
    );
  reportParts.push(`Number of students: ${totalStudents}`);
  Object.entries(studentGroups).forEach(([field, group]) => {
    reportParts.push(`Number of students in ${field}: ${group.length}. List: ${group.map((student) => student.firstname).join(', ')}`);
  });

  return reportParts.join('\n');
};

app.get('/', (_, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', async (_, res) => {
  const responseParts = ['This is the list of our students'];
  try {
    const report = await countStudents(DB_FILE);
    responseParts.push(report);
    const responseText = responseParts.join('\n');
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Length', responseText.length);
    res.statusCode = 200;
    res.send(responseText);
  } catch (err) {
    const responseText = `Error: ${err.message}`;
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Length', responseText.length);
    res.statusCode = 500;
    res.send(responseText);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

module.exports = app;
