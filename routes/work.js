const express = require('express');
const router = express.Router();
const Work = require('../models/work');
const Employee = require('../models/employee');

// Create a new work entry
router.post('/work', async (req, res) => {
    const { IDX_CD, USER_KEY_CD, DATE_YMD, TIME_DT, FIN_FLG } = req.body;
    try {
        const work = await Work.create({ 
            IDX_CD, 
            USER_KEY_CD, 
            DATE_YMD, 
            TIME_DT,
            FIN_FLG
        });
        res.status(201).json(work);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create work' });
    }
});

// Retrieve all work entries
router.get('/work', async (req, res) => {
    try {
        const works = await Work.findAll({
            include: [
                {
                    model: Employee,
                    attributes: ['USER_NM'] // 가져오고 싶은 employee 속성
                }
            ]
        });
        res.json(works);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve works' });
    }
});

// Retrieve a specific work entry by ID
router.get('/work/:IDX_CD', async (req, res) => {
    const { IDX_CD } = req.params;
    try {
        const work = await Work.findByPk(IDX_CD);
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
router.put('/work/:IDX_CD', async (req, res) => {
    const { IDX_CD } = req.params;
    const { USER_KEY_CD, DATE_YMD, TIME_DT, FIN_FLG } = req.body;
    try {
        const work = await Work.findByPk(IDX_CD);
        if (work) {
            work.USER_KEY_CD = USER_KEY_CD;
            work.DATE_YMD = DATE_YMD;
            work.TIME_DT = TIME_DT;
            work.FIN_FLG = FIN_FLG;
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
router.delete('/work/:IDX_CD', async (req, res) => {
    const { IDX_CD } = req.params;
    try {
        const work = await Work.findByPk(IDX_CD);
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
