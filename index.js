const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/shopify-webhook', (req, res) => {
  const data = req.body;

  // Extract Minecraft username from order notes (custom field)
  const username = data.note_attributes?.find(attr => attr.name === 'username')?.value;
  const item = data.line_items?.[0]?.title || 'default_item';

  console.log(`Webhook received: Give ${item} to ${username}`);

  // Optional: Send to Minecraft server using WebSender/RCON here

  res.status(200).send('OK');
});

app.get('/', (req, res) => {
  res.send('Webhook server running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
