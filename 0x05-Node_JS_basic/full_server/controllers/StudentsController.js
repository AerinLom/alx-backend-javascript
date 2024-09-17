import readDatabase from '../utils';

const SUPPORTED_MAJORS = ['CS', 'SWE'];

class StudentsController {
  static getAllStudents(req, res) {
    const databaseFilePath = process.argv.length > 2 ? process.argv[2] : '';

    readDatabase(databaseFilePath)
      .then((studentsByMajor) => {
        const responseMessages = ['This is the list of our students'];
        const sortByAlphabeticalOrder = (majorA, majorB) => {
          if (majorA[0].toLowerCase() < majorB[0].toLowerCase()) {
            return -1;
          }
          if (majorA[0].toLowerCase() > majorB[0].toLowerCase()) {
            return 1;
          }
          return 0;
        };
        const sortedMajors = Object.entries(studentsByMajor)
          .sort(sortByAlphabeticalOrder);

        for (const [major, students] of sortedMajors) {
          responseMessages.push([
            `Number of students in ${major}: ${students.length}.`,
            'List:',
            students.map((student) => student.firstname).join(', '),
          ].join(' '));
        }
        res.status(200).send(responseMessages.join('\n'));
      })
      .catch((error) => {
        res
          .status(500)
          .send(error instanceof Error ? error.message : error.toString());
      });
  }

  static getAllStudentsByMajor(req, res) {
    const databaseFilePath = process.argv.length > 2 ? process.argv[2] : '';
    const { major } = req.params;

    if (!SUPPORTED_MAJORS.includes(major)) {
      res.status(500).send('Major parameter must be CS or SWE');
      return;
    }
    readDatabase(databaseFilePath)
      .then((studentsByMajor) => {
        let studentsList = '';

        if (Object.keys(studentsByMajor).includes(major)) {
          const students = studentsByMajor[major];
          studentsList = `List: ${students.map((student) => student.firstname).join(', ')}`;
        }
        res.status(200).send(studentsList);
      })
      .catch((error) => {
        res
          .status(500)
          .send(error instanceof Error ? error.message : error.toString());
      });
  }
}

export default StudentsController;
module.exports = StudentsController;
