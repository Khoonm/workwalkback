const express = require('express');
const router = express.Router();
const Employee = require('./models/employee.js');


router.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html');
});

router.post('/employee', async (req, res) => {
    const { nickname, key, department, phone_number } = req.body;
    try {
        const employee = await Employee.create({ 
            nickname, 
            key, 
            department, 
            phone_number 
        });
        res.status(201).json(employee);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create employee' });
    }
});
  
router.get('/employee', async (req, res) => {
    try {
        const employee = await Employee.findAll();
        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve employees' });
    }
});
  
router.get('/employee/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await Employee.findByPk(id);
        if (employee) {
            res.json(employee);
        } else {
            res.status(404).json({ error: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve employee' });
    }
});
  
router.put('/employee/:id', async (req, res) => {
    const { id } = req.params;
    const { nickname, key, department, phone_number } = req.body;
    try {
        const employee = await Employee.findByPk(id);
        if (employee) {
            employee.nickname = nickname;
            employee.key = key;
            employee.department = department;
            employee.phone_number = phone_number;
            await employee.save();
            res.json(employee);
        } else {
            res.status(404).json({ error: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update employee' });
    }
});
  
router.delete('/employee/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await Employee.findByPk(id);
        if (employee) {
            await employee.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Employee not found' });
        }
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete employee' });
    }
});

module.exports = router;