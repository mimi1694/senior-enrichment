const db = require('./server/db/models').db;
const Campus = require('./server/db/models').Campus;
const Student = require('./server/db/models').Student;

const defaultImage = 'http://www.hwslakeview.com/wp-content/uploads/2015/12/191630.jpg'
//data here
const campuses = [
    {
        name: 'New York City',
        imageUrl: defaultImage
    },
    {
        name: 'Ithaca',
        imageUrl: defaultImage
    },
    {
        name: 'Los Angeles',
        imageUrl: defaultImage
    },
    {
        name: 'Chicago',
        imageUrl: defaultImage
    }
]

const students = [
    {
        firstName: 'Justin',
        lastName: 'Cohen',
        email: 'justin.cohen@gmail.com',
        gpa: 3.4,
        campusId: 2
    },
    {
        firstName: 'Mimi',
        lastName: 'Scott',
        email: 'mimi.scott@mhia.edu',
        gpa: 3.9,
        campusId: 1
    },
    {
        firstName: 'Allie',
        lastName: 'Ohara',
        email: 'allie.ohara@mhia.edu',
        gpa: 3.4,
        campusId: 1
    },
    {
        firstName: 'Josh',
        lastName: 'Kesner',
        email: 'joshkesner@yahoo.com',
        gpa: 2.8,
        campusId: 3
    },
    {
        firstName: 'Andrew',
        lastName: 'Kelly',
        email: 'akelly@aol.com',
        gpa: 3.1,
        campusId: 4
    },
    {
        firstName: 'Lucy',
        lastName: 'Crane',
        email: 'lucy.crane@gmail.com',
        gpa: 3.5,
        campusId: 2
    },
    {
        firstName: 'Roz',
        lastName: 'Bauer',
        email: 'rozbauer@verizon.net',
        gpa: 2.3,
        campusId: 4
    }
]

const seed = () =>
    Promise.all(campuses.map(campus =>
        Campus.create(campus))
    )
    .then(()=>Promise.all(students.map(student =>
            Student.create(student)
    )))

    
    

const main = () => {
    console.log('Syncing db...');
    db.sync({ force: true })
      .then(() => {
        console.log('Seeding databse...');
        return seed();
      })
      .catch(err => {
        console.log('Error while seeding');
        console.log(err.stack);
      })
      .then(() => {
        db.close();
        return null;
      });
  };
  
main();
