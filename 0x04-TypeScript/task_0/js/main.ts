interface Student {
  firstName: string;
  lastName: string;
  age: number;
  location: string;
}

const student1: Student = {
  firstName: 'John',
  lastName: 'Doe',
  age: 20,
  location: 'New York',
};

const student2: Student = {
  firstName: 'Jane',
  lastName: 'Smith',
  age: 22,
  location: 'Los Angeles',
};

let studentsList: Student[] = [];

studentsList.push(student1);
studentsList.push(student2);

let table = document.createElement('table');

for (let i = 0; i < studentsList.length; i++) {
  let row = table.insertRow();
  let nameCell = row.insertCell();
  let locationCell = row.insertCell();
  nameCell.innerHTML = studentsList[i].firstName;
  locationCell.innerHTML = studentsList[i].location;
}

document.body.appendChild(table);
