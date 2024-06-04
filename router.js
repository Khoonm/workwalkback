const express = require('express');
const router = express.Router();

router.get("/router", (req, res) => {
    console.log("### ROUTE /");
});

module.exports = router;