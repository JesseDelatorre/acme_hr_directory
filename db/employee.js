const client = require('./client.js');

const createEmployee = async(employeeName, deptId) => {
  try{
    const { rows } = await client.query(`
     INSERT INTO employee (name, dept_id)
     VALUES ('${employeeName}', ${deptId})
     RETURNING *;
      `);
      const addedEmployee = rows[0]
      console.log(addedEmployee);
      return addedEmployee;
  } catch(err) {
    console.log(err);
  }
};

module.exports = {
  createEmployee
}