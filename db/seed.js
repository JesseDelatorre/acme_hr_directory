const client = require('./client.js');
const { createDepartment } = require('./department.js');
const { createEmployee } = require('./employee.js');

const dropTables = async() => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS department;
      DROP TABLE IF EXISTS employees;
      `)
  } catch (err) {
    console.log(err);
  }
};

const createTables = async() => {
  try {
    await client.query(`
    CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name  VARCHAR(30) UNIQUE NOT NULL
    );
     
    CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    dept_id INT REFERENCES department(id)
    );
    `);
  } catch (err) {
    console.log(err);
  }
};

const syncAndSeed = async() => {
  try {
    await client.connect();
    console.log('connected to DB');

    console.log('dropping tables');
    await dropTables();
    console.log('dropped tables');

    console.log('creating tables');
    await createTables();
    console.log('created tables');

    console.log('creating department');
    // const produce = 
    await createDepartment('produce');
    // const butcher = 
    await createDepartment('butcher');
    // const seafood = 
    await createDepartment('seafood');
    // const bakery = 
    await createDepartment('bakery');
    // const checkout =
     await createDepartment('checkout');
    console.log('department created');

    console.log('creating employees');
    await createEmployee('John smith', 1);   //produce.id
    await createEmployee('Mike Wazowski', 4);  //bakery.id
    await createEmployee('Bobby Cutz', 2);  //butcher.id
    await createEmployee('Sol Fisher', 3);   //seafood.id
    await createEmployee('Jennifer Cash', 5);   //checkout.id
    await createEmployee('Bruce Wayne', 5);    //checkout.id
    await createEmployee('Wade Johnson', 4);     //bakery.id
    await createEmployee('Jeff Polls', 3);   //seafood.id
    await createEmployee('Sullivan King', 1);  //produce.id
    await createEmployee('Colleen Cross', 2);   //butcher.id
    console.log('employee created');


    await client.end();
    console.log('disconnecting from db');
  } catch (err) {
    console.log(err);
  }

};

syncAndSeed();