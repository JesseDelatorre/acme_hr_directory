const client = require('./client.js');

const createDepartment = async(departmentName) => {
  try {
    const { rows } = await client.query(`
    INSERT INTO department (name)
    VALUES ('${departmentName}')
    RETURNING *;
    `);
    const dept = rows[0];
    return dept;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  createDepartment
};