const express = require('express');
const router = express.Router();
const Work = require('../models/work');

// Create a new work entry
router.post('/work', async (req, res) => {
    const { date, status, name, reviewer, description } = req.body;
    try {
        const work = await Work.create({ 
            date, 
            status, 
            name, 
            reviewer, 
            description 
        });
        res.status(201).json(work);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create work' });
    }
});

// Retrieve all work entries
router.get('/work', async (req, res) => {
    try {
        const works = await Work.findAll();
        res.json(works);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve works' });
    }
});

// Retrieve a specific work entry by ID
router.get('/work/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const work = await Work.findByPk(id);
        if (work) {
            res.json(work);
        } else {
            res.status(404).json({ error: 'Work not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve work' });
    }
});

// Update a specific work entry by ID
router.put('/work/:id', async (req, res) => {
    const { id } = req.params;
    const { date, status, name, reviewer, description } = req.body;
    try {
        const work = await Work.findByPk(id);
        if (work) {
            work.date = date;
            work.status = status;
            work.name = name;
            work.reviewer = reviewer;
            work.description = description;
            await work.save();
            res.json(work);
        } else {
            res.status(404).json({ error: 'Work not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update work' });
    }
});

// Delete a specific work entry by ID
router.delete('/work/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const work = await Work.findByPk(id);
        if (work) {
            await work.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Work not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete work' });
    }
});

module.exports = router;
