const express = require('express');
const createClient = require('redis').createClient;
const bodyParser = require('body-parser');

// Create Redis client
const client = createClient({
  password: '',
  url: ''
});

// Initialize Express app
const app = express();
app.use(bodyParser.json());

// Endpoint to add an item
app.post('/:key', (req, res) => {
  const key = req.params.key;
  const { field, value } = req.body;

  if (!key || !field || !value) {
    return res
      .status(400)
      .json({ error: 'Please provide the key, field & value' });
  }

  client.hset(key, field, JSON.stringify(value), (err, reply) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(201).json({ message: 'Item added successfully' });
  });
});

// Endpoint to delete an item
app.delete('/:key/:field', (req, res) => {
  const key = req.params.key;
  const field = req.params.field;

  client.hdel(key, field, (err, reply) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (reply === 1) {
      res.status(200).json({ message: 'Item deleted successfully' });
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  });
});

// Endpoint to retrieve all items
app.get('/:key', (req, res) => {
  const key = req.params.key;

  client.hgetall(key, (err, items) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (!items) {
      return res.status(404).json({ error: 'No items found' });
    }
    const itemList = Object.entries(items).map(([field, value]) => ({
      field,
      value
    }));
    res.status(200).json(itemList);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
