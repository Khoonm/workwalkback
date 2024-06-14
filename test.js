const express = require('express');
const path = require('path');
const fs = require("fs");
const axios = require('axios');

const transformData = (item) => ({
    TICKET_IDX: item['Ticket'],
    GROUP_NUM: item['Cluster'],
    USER_KEY_CD: "AADS1251",
    DATE_YMD: "2024-06-06",
    // USER_KEY_CD: USER_KEY_CD,
    // DATE_YMD: GET_DATE_YMD,
    HEAD_KEYWORD_STR: item['Representation'][0],
    KEYWORD_STR: item['Representation'].join(', '),
    SCORE_NUM: item['Mean Similarity']
});

fs.readFile("temp2.json", "utf8", async (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const parsedData = JSON.parse(data);
    for (const d of parsedData) {
        try {
            const response = await axios.post('http://localhost:3000/group', transformData(d));
            console.log('POST 요청 성공:', response.data);
        } catch (error) {
            console.error('POST 요청 실패:', error);
        }
    }
});
