const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');

    const lines = data.trim().split('\n').filter(line => line);

    if (lines.length === 0) throw new Error('Cannot load the database');

    const header = lines[0].split(',');

    const studentsByField = {};

    for (let i = 1; i < lines.length; i++) {
      const student = lines[i].split(',');

      if (student.length !== header.length) continue;

      const firstName = student[0];
      const field = student[3];

      if (!studentsByField[field]) {
        studentsByField[field] = [];
      }
      studentsByField[field].push(firstName);
    }

    const totalStudents = Object.values(studentsByField).reduce(
      (acc, students) => acc + students.length,
      0
    );
    console.log(`Number of students: ${totalStudents}`);

    for (const [field, students] of Object.entries(studentsByField)) {
      console.log(
        `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`
      );
    }
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
