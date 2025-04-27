const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    const order = req.body;
    const playerName = order.note_attributes.find(attr => attr.name === 'Minecraft Username').value;
    const rank = order.line_items[0].title;

    const logLine = `Player ${playerName} bought rank ${rank}\n`;

    fs.appendFile('shopify-purchases.txt', logLine, (err) => {
        if (err) {
            console.error('Failed to write purchase:', err);
            res.sendStatus(500);
            return;
        }
        console.log('Logged purchase:', logLine);
        res.sendStatus(200);
    });
});

app.listen(3000, () => console.log('Webhook server running on port 3000.'));
