// Load environment variables from the .env file
require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const apiKey = process.env.API_KEY;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to get the API key
app.get('/config', (req, res) => {
    res.json({ apiKey: apiKey });
});

// Catch-all route to serve index.html for any other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

