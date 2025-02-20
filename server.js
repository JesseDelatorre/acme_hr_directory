const  { createEmployee } = require('./db/employee.js');

const client = require('./db/client.js');
client.connect();

const express = require('express')
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
console.log('Welcome');
});

app.get('/api/v1/employee', async(req, res, next) => {
const { name } = req.body;

try{
  const newEmployee = await createEmployee(name, null)
  res.send(newEmployee)
} catch(err) {
  console.log(err);
}
});

// app.post('/api/v1/employee', async(req, res, next) => {
//   const { name } = req.body;

//   try {
//     const newEmployee = await createEmployee(name, null)
//     res.send(newEmployee);
//   } catch(err) {
//     console.log(err);
//     next('ERROR CREATING EMPLOYEE');
//   }
// });


app.listen(3000, () => {
  console.log('listening on port 3000');
});