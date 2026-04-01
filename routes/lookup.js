const express = require('express');
const https = require('https');

//Router will direct web requests and results
const router = express.Router();

router.get('/', (req, res) => {
    const username = req.query.player;
    if (!username) {
        return res.status(400).json({ error: 'Player name is required' });
    }
    console.log("ATTEMPTING TO LOAD PLAYER DATA FROM JAGEX for " + username);

    const url = `https://secure.runescape.com/m=hiscore_oldschool/index_lite.json?player=${encodeURIComponent(username)}`;

    https.get(url, (apiRes) => {
        let data = '';
        apiRes.on('data', (chunk) => {
            data += chunk;
        });
        apiRes.on('end', () => {
            try {
                const jsonData = JSON.parse(data);
                res.json(jsonData);
            } catch (err) {
                res.status(500).json({ error: 'Failed to parse API response' });
            }
        });
    }).on('error', (err) => {
        console.error('Error fetching from Jagex:', err);
        res.status(500).json({ error: 'Failed to fetch player data' });
    });
});

module.exports = router;