import express from 'express';
import EmployeeController from '../controllers/employeeController';

const router = express.Router();
const employeeController = new EmployeeController();

const initApi = (app: express.Application): express.Application => {
    router.get('/employee', employeeController.getFunc);

    router.post('/employee/create-user', employeeController.insertFunc);

    router.put('/employee/update-user', employeeController.updateFunc);

    router.delete('/employee/delete-user/:id', employeeController.deleteFunc);

    return app.use('/api/v1', router);
}

export default initApi;
