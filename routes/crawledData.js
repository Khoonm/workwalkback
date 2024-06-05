// routes/crawledData.js
const express = require('express');
const router = express.Router();
const CrawledData = require('../models/crawledData');

// Create a new crawled data entry
router.post('/crawledData', async (req, res) => {
    const { timestamp, url, text } = req.body;
    try {
        const crawledData = await CrawledData.create({ 
            timestamp, 
            url, 
            text 
        });
        res.status(201).json(crawledData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create crawled data entry' });
    }
});

// Retrieve all crawled data entries
router.get('/crawledData', async (req, res) => {
    try {
        const crawledData = await CrawledData.findAll();
        res.json(crawledData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve crawled data entries' });
    }
});

// Retrieve a specific crawled data entry by ID
router.get('/crawledData/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const crawledData = await CrawledData.findByPk(id);
        if (crawledData) {
            res.json(crawledData);
        } else {
            res.status(404).json({ error: 'Crawled data entry not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve crawled data entry' });
    }
});

// Update a specific crawled data entry by ID
router.put('/crawledData/:id', async (req, res) => {
    const { id } = req.params;
    const { timestamp, url, text } = req.body;
    try {
        const crawledData = await CrawledData.findByPk(id);
        if (crawledData) {
            crawledData.timestamp = timestamp;
            crawledData.url = url;
            crawledData.text = text;
            await crawledData.save();
            res.json(crawledData);
        } else {
            res.status(404).json({ error: 'Crawled data entry not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update crawled data entry' });
    }
});

// Delete a specific crawled data entry by ID
router.delete('/crawledData/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const crawledData = await CrawledData.findByPk(id);
        if (crawledData) {
            await crawledData.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Crawled data entry not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete crawled data entry' });
    }
});

module.exports = router;
