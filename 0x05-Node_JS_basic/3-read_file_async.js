const fs = require('fs').promises;

const countStudents = async (dataPath) => {
  try {
    const data = await fs.readFile(dataPath, 'utf-8');
    const fileLines = data.trim().split('\n');
    const studentGroups = {};
    const dbFieldNames = fileLines[0].split(',');
    const studentPropNames = dbFieldNames.slice(0, -1);

    fileLines.slice(1).forEach((line) => {
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
  } catch (error) {
    throw new Error('Cannot load the database');
  }
};

module.exports = countStudents;
