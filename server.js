const express = require('express');
const path = require('path');

const app = express();

// Define the directory where your HTML files are stored
const htmlDirectory = path.join(__dirname, 'html');

// Serve HTML files based on different routes
app.get('/', (req, res) => {
  res.sendFile(path.join(htmlDirectory, 'index.html'));
});

app.get('/signin', (req, res) => {
  res.sendFile(path.join(htmlDirectory, 'signin.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(htmlDirectory, 'signup.html'));
});

// Define the directory where your CSS files are stored
const cssDirectory = path.join(__dirname, 'html');

// Serve static CSS files from the 'html' directory
app.use('/html', express.static(cssDirectory));

// Define the directory where your photos/images are stored
const photosDirectory = path.join(__dirname, 'Sources');

// Serve static files from the 'Sources' directory
app.use('/Sources', express.static(photosDirectory));

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
