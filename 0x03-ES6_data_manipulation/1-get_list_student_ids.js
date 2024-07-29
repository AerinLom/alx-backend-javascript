export default function getListStudentIds(object) {
  if (!Array.isArray(object)) {
    return [];
  }

  return object.map((student) => student.id);
}
