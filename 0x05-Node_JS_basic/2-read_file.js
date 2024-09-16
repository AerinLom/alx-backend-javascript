const fs = require('fs');

const countStudents = (dataPath) => {
  if (!fs.existsSync(dataPath) || !fs.statSync(dataPath).isFile()) {
    throw new Error('Cannot load the database');
  }

  const fileLines = fs.readFileSync(dataPath, 'utf-8').trim().split('\n');
  const [headerLine, ...dataLines] = fileLines;
  const studentGroups = {};
  const dbFieldNames = headerLine.split(',');
  const studentPropNames = dbFieldNames.slice(0, -1);

  dataLines.forEach((line) => {
    const studentRecord = line.split(',');
    const studentPropValues = studentRecord.slice(0, -1);
    const field = studentRecord[studentRecord.length - 1];

    if (!studentGroups[field]) {
      studentGroups[field] = [];
    }

    const studentEntries = studentPropNames
      .map((propName, idx) => [propName, studentPropValues[idx]]);
    studentGroups[field].push(Object.fromEntries(studentEntries));
  });

  const totalStudents = Object.values(studentGroups)
    .reduce((acc, group) => acc + group.length, 0);

  console.log(`Number of students: ${totalStudents}`);
  Object.entries(studentGroups).forEach(([field, group]) => {
    const studentNames = group.map((student) => student.firstname).join(', ');
    console.log(`Number of students in ${field}: ${group.length}. List: ${studentNames}`);
  });
};

module.exports = countStudents;
