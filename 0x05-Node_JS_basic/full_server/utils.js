import fs from 'fs';

const readDatabase = (filePath) => new Promise((resolve, reject) => {
  if (!filePath) {
    reject(new Error('Cannot load the database'));
  }
  if (filePath) {
    fs.readFile(filePath, (error, fileData) => {
      if (error) {
        reject(new Error('Cannot load the database'));
      }
      if (fileData) {
        const lines = fileData
          .toString('utf-8')
          .trim()
          .split('\n');
        const studentsByMajor = {};
        const headers = lines[0].split(',');
        const studentProps = headers.slice(0, headers.length - 1);

        for (const record of lines.slice(1)) {
          const studentDetails = record.split(',');
          const studentValues = studentDetails.slice(0, studentDetails.length - 1);
          const major = studentDetails[studentDetails.length - 1];

          if (!Object.keys(studentsByMajor).includes(major)) {
            studentsByMajor[major] = [];
          }

          const student = studentProps
            .map((propName, index) => [propName, studentValues[index]]);

          studentsByMajor[major].push(Object.fromEntries(student));
        }
        resolve(studentsByMajor);
      }
    });
  }
});

export default readDatabase;
module.exports = readDatabase;
