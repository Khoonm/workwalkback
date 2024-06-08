const express = require('express');
const router = express.Router();
const Group = require('../models/group.js');

// Create a new group entry
router.post('/group', async (req, res) => {
    const { GROUP_IDX, TICKET_IDX, GROUP_NUM, USER_KEY_CD, DATE_YMD, DATA_CNT, HEAD_KEYWORD_STR, KEYWORD_STR, WORK_FLG, SCORE_NUM } = req.body;
    try {
        const group = await Group.create({ 
            GROUP_IDX, 
            TICKET_IDX, 
            GROUP_NUM, 
            USER_KEY_CD, 
            DATE_YMD, 
            DATA_CNT, 
            HEAD_KEYWORD_STR, 
            KEYWORD_STR, 
            WORK_FLG, 
            SCORE_NUM 
        });
        res.status(201).json(group);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create group' });
    }
});

// Retrieve all group entries
router.get('/group', async (req, res) => {
    try {
        const group = await Group.findAll();
        res.json(group);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve groups' });
    }
});

// Retrieve a specific group entry by ID
router.get('/group/:GROUP_IDX', async (req, res) => {
    const { GROUP_IDX } = req.params;
    try {
        const group = await Group.findByPk(GROUP_IDX);
        if (group) {
            res.json(group);
        } else {
            res.status(404).json({ error: 'Group not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve group' });
    }
});

// Update a specific group entry by ID
router.put('/group/:GROUP_IDX', async (req, res) => {
    const { GROUP_IDX } = req.params;
    const { TICKET_IDX, GROUP_NUM, USER_KEY_CD, DATE_YMD, DATA_CNT, HEAD_KEYWORD_STR, KEYWORD_STR, WORK_FLG, SCORE_NUM } = req.body;
    try {
        const group = await Group.findByPk(GROUP_IDX);
        if (group) {
            group.TICKET_IDX = TICKET_IDX;
            group.GROUP_NUM = GROUP_NUM;
            group.USER_KEY_CD = USER_KEY_CD;
            group.DATE_YMD = DATE_YMD;
            group.DATA_CNT = DATA_CNT;
            group.HEAD_KEYWORD_STR = HEAD_KEYWORD_STR;
            group.KEYWORD_STR = KEYWORD_STR;
            group.WORK_FLG = WORK_FLG;
            group.SCORE_NUM = SCORE_NUM
            await group.save();
            res.json(group);
        } else {
            res.status(404).json({ error: 'Group not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update group' });
    }
});

// Delete a specific group entry by ID
router.delete('/group/:GROUP_IDX', async (req, res) => {
    const { GROUP_IDX } = req.params;
    try {
        const group = await Group.findByPk(GROUP_IDX);
        if (group) {
            await group.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Group not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete group' });
    }
});

module.exports = router;