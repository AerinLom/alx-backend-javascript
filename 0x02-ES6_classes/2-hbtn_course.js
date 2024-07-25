export default class HolbertonCourse {
  constructor(name, length, students) {
    this._name = HolbertonCourse._validateName(name);
    this._length = HolbertonCourse._validateLength(length);
    this._students = HolbertonCourse._validateStudents(students);
  }

  // Static method to validate and set name
  static _validateName(name) {
    if (typeof name !== 'string') {
      throw new TypeError('Name must be a string');
    }
    return name;
  }

  // Static method to validate and set length
  static _validateLength(length) {
    if (typeof length !== 'number') {
      throw new TypeError('Length must be a number');
    }
    return length;
  }

  // Static method to validate and set students
  static _validateStudents(students) {
    if (!Array.isArray(students) || !students.every((student) => typeof student === 'string')) {
      throw new TypeError('Students must be an array of strings');
    }
    return students;
  }

  // Getter and setter for name
  get name() {
    return this._name;
  }

  set name(name) {
    this._name = HolbertonCourse._validateName(name);
  }

  // Getter and setter for length
  get length() {
    return this._length;
  }

  set length(length) {
    this._length = HolbertonCourse._validateLength(length);
  }

  // Getter and setter for students
  get students() {
    return this._students;
  }

  set students(students) {
    this._students = HolbertonCourse._validateStudents(students);
  }
}
