const express = require('express');
const fs = require('fs').promises;

const PORT = 1245;
const DB_FILE = process.argv[2] || '';

const countStudents = async (dataPath) => {
  if (!dataPath) throw new Error('Cannot load the database');

  const data = await fs.readFile(dataPath, 'utf-8');
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

  return reportParts.join('\n');
};

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  try {
    const report = await countStudents(DB_FILE);
    res.send(`This is the list of our students\n${report}`);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;
