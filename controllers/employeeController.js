const data = {
    employees: require('../model/employees.json'),
    setEmployees: function (employees) {
        this.employees = employees;
    }
}

const getAllEmployees = (req, res) => {
    res.json(data.employees);
}

const createEmployee = (req, res) => {
    const newEmployee = {
        id: data.employees.length ? data.employees[data.employees.length - 1].id + 1 : 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    };

    // Validate input
    if (!newEmployee.firstname || !newEmployee.lastname) {
        return res.status(400).json({ message: 'First name and last name are required' });
    }

    // Check for duplicate employee
    const duplicate = data.employees.find(emp => emp.firstname === newEmployee.firstname && emp.lastname === newEmployee.lastname);
    if (duplicate) {
        return res.status(400).json({ message: 'Employee already exists' });
    }

    // Add new employee to the data
    data.employees.push(newEmployee);
    data.setEmployees(data.employees);

    res.status(201).json(newEmployee);
}

const updateEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.params.id));
    if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
    }

    employee.firstname = req.body.firstname;
    employee.lastname = req.body.lastname;

    data.setEmployees(data.employees);

    res.json(employee);
}

const deleteEmployee = (req, res) => {
    const employeeIndex = data.employees.findIndex(emp => emp.id === parseInt(req.params.id));
    if (employeeIndex === -1) {
        return res.status(404).json({ message: 'Employee not found' });
    }

    const deletedEmployee = data.employees.splice(employeeIndex, 1)[0];

    // Reorder IDs sequentially
    data.employees.forEach((emp, idx) => {
        emp.id = idx + 1;
    });

    data.setEmployees(data.employees);

    res.json(deletedEmployee);
}

const getEmployeeById = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.params.id));
    if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
}

module.exports = {
    getAllEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeById
};