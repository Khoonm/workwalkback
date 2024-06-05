// routes/workStatus.js
const express = require('express');
const router = express.Router();
const WorkStatus = require('../models/workStatus');

// Create a new work status entry
router.post('/workStatus', async (req, res) => {
    const { name, status, total_hours, commute_method, report } = req.body;
    try {
        const workStatus = await WorkStatus.create({ 
            name, 
            status, 
            total_hours, 
            commute_method, 
            report 
        });
        res.status(201).json(workStatus);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create work status' });
    }
});

// Retrieve all work status entries
router.get('/workStatus', async (req, res) => {
    try {
        const workStatuses = await WorkStatus.findAll();
        res.json(workStatuses);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve work statuses' });
    }
});

// Retrieve a specific work status entry by ID
router.get('/workStatus/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const workStatus = await WorkStatus.findByPk(id);
        if (workStatus) {
            res.json(workStatus);
        } else {
            res.status(404).json({ error: 'Work status not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve work status' });
    }
});

// Update a specific work status entry by ID
router.put('/workStatus/:id', async (req, res) => {
    const { id } = req.params;
    const { name, status, total_hours, commute_method, report } = req.body;
    try {
        const workStatus = await WorkStatus.findByPk(id);
        if (workStatus) {
            workStatus.name = name;
            workStatus.status = status;
            workStatus.total_hours = total_hours;
            workStatus.commute_method = commute_method;
            workStatus.report = report;
            await workStatus.save();
            res.json(workStatus);
        } else {
            res.status(404).json({ error: 'Work status not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update work status' });
    }
});

// Delete a specific work status entry by ID
router.delete('/workStatus/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const workStatus = await WorkStatus.findByPk(id);
        if (workStatus) {
            await workStatus.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Work status not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete work status' });
    }
});

module.exports = router;
