const express = require('express');
const router = express.Router();
const CrawledData = require('../models/crawledData');

// Create a new data entry
router.post('/crawledData', async (req, res) => {
    const { USER_KEY_CD, GET_DATE_YMD, GET_TIME_DT, URL_STR, DATA_STR, TYPE_FLG } = req.body;
    try {
        // if TYPE_FLG == 1 인 경우 select 해서 *한 다음에 USER_KEY_CD, GET_DATE_YMD에 맞는 데이터만 가져오기
        // 가져온 데이터를 보내 clustering.py를 실행시키기
        const crawledData = await CrawledData.create({ 
            USER_KEY_CD,
            GET_DATE_YMD,
            GET_TIME_DT,
            URL_STR,
            DATA_STR
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
router.get('/crawledData/:IDX_CD', async (req, res) => {
    const { IDX_CD } = req.params;
    try {
        const crawledData = await CrawledData.findByPk(IDX_CD);
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
router.put('/crawledData/:IDX_CD', async (req, res) => {
    const { IDX_CD } = req.params;
    const { USER_KEY_CD, GET_DATE_YMD, GET_TIME_DT, URL_STR, DATA_STR, TYPE_FLG } = req.body;
    try {
        const crawledData = await CrawledData.findByPk(IDX_CD);
        if (crawledData) {
            crawledData.USER_KEY_CD = USER_KEY_CD;
            crawledData.GET_DATE_YMD = GET_DATE_YMD;
            crawledData.GET_TIME_DT = GET_TIME_DT;
            crawledData.URL_STR = URL_STR;
            crawledData.DATA_STR = DATA_STR;
            crawledData.TYPE_FLG = TYPE_FLG;
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
router.delete('/crawledData/:IDX_CD', async (req, res) => {
    const { IDX_CD } = req.params;
    try {
        const crawledData = await CrawledData.findByPk(IDX_CD);
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
