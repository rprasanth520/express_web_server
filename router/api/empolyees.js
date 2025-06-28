const express = require('express');
const router = express.Router();
const employeesController = require('../../controllers/employeeController');

router.get('/', employeesController.getAllEmployees);

router.post('/', employeesController.createEmployee);

router.put('/:id', employeesController.updateEmployee);

router.delete('/:id', employeesController.deleteEmployee);

router.get('/:id', employeesController.getEmployeeById);

module.exports = router;