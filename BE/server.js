const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./database.js');
const employeeRoutes = require('./routers/employeeRouter.js');
const timeLogRoutes = require('./routers/workTimeRouter.js');
const salaryRoutes = require('./routers/salaryRouter.js');
const incidentRequestRoutes = require('./routers/incidentRequestRouter.js');
const loginRouter = require('./routers/loginRouter.js');
const notificationRouter = require('./routers/notificationRouter.js')
const XinNghiPhepRouter = require('./routers/XinNghiPhepRouter.js')

const app = express();
const port = 3000;
const ip = '192.168.12.117';

app.use(bodyParser.json());
app.use(express.json());

app.use('/api/employees', employeeRoutes);
app.use('/api/worktimes', timeLogRoutes);
app.use('/api/salaries', salaryRoutes);
app.use('/api/incidents', incidentRequestRoutes);
app.use('/api/login', loginRouter);
app.use('/api/notification', notificationRouter);
app.use('/api/XinNghiPhep', XinNghiPhepRouter)
app.get('/', (req, res) => {
  res.send('Welcome to the Home Page!');
});

app.listen(port, ip, () => {
  console.log(`Server running on http://${ip}:${port}`);
});
