const express = require('express');
const path = require('path');
const mysql = require('mysql');
const { body, validationResult } = require('express-validator');
const bodyParser = require('body-parser');

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

app.get('/admin', (req, res) => {
  res.sendFile(path.join(htmlDirectory, 'admin.html'));
});

app.get('/accommodation', (req, res) => {
  res.sendFile(path.join(htmlDirectory, 'accommodation.html'));
});

app.get('/amenities', (req, res) => {
  res.sendFile(path.join(htmlDirectory, 'amenities.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(htmlDirectory, 'about_us.html'));
});

// Define the directory where your CSS files are stored
const cssDirectory = path.join(__dirname, 'html');

// Serve static CSS files from the 'html' directory
app.use('/html', express.static(cssDirectory));

// Define the directory where your photos/images are stored
const photosDirectory = path.join(__dirname, 'Sources');
const designDirectory = path.join(__dirname, 'fontawesome');

// Serve static files from the 'Sources' directory
app.use('/Sources', express.static(photosDirectory));
app.use('/fontawesome', express.static(designDirectory));

// Set up MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'roomdb'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Route to fetch data and render HTML using EJS
app.get('/booking', (req, res) => {
  // Fetch data from the database
  connection.query('SELECT * FROM rooms', (error, results) => {
    if (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Error fetching data');
      return;
    }

    // Render HTML using EJS template engine and pass fetched data
    res.render('booking', { data: results });
  });
});

app.get('/users', (req, res) => {
  // Fetch data from the database
  connection.query('SELECT * FROM users', (error, results) => {
    if (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Error fetching data');
      return;
    }

    // Render HTML using EJS template engine and pass fetched data
    res.render('users', { data: results });
  });
});

app.get('/settings', (req, res) => {
  // Fetch data from the database
  connection.query('SELECT * FROM rooms', (error, results) => {
    if (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Error fetching data');
      return;
    }

    // Render HTML using EJS template engine and pass fetched data
    res.render('settings', { data: results });
  });
});

app.get('/feedbacks', (req, res) => {
  // Fetch data from the database
  connection.query('SELECT * FROM feedbacks', (error, results) => {
    if (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Error fetching data');
      return;
    }

    // Render HTML using EJS template engine and pass fetched data
    res.render('feedbacks', { data: results });
  });
});



// Middleware for parsing URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Sign-in form submission handling
app.post('/signin', (req, res) => {
  const { email, password } = req.body;

  // Perform user authentication against the database
  connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ message: 'Error querying database' });
    }

    if (results.length === 0) {
      // No user found with provided email and password
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Authentication successful, check the user's role
    const userRole = results[0].roles; // Assuming 'role' is a column in the users table
    if (userRole === 'Admin') {
      // If user is admin, redirect to admin.html
      res.redirect('/admin');
    } else {
      // If user is not admin, redirect to index.html
      res.redirect('/');
    }
  });
});

// Handle POST request for user registration
app.post('/signup', (req, res) => {
  const { fullname, username, email, contact, password, cpassword } = req.body;

  // Check if password and confirm password match
  if (password !== cpassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  // Check if user with the same email or username already exists
  connection.query('SELECT * FROM users WHERE email = ? OR username = ?', [email, username], (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ message: 'Error querying database' });
    }

    if (results.length > 0) {
      // User with the same email or username already exists
      return res.status(400).json({ message: 'User with this email or username already exists' });
    }

    // Insert new user into the database
    connection.query('INSERT INTO users (fullname, username, email, contact_number, password) VALUES (?, ?, ?, ?, ?)', [fullname, username, email, contact, password], (err, result) => {
      if (err) {
        console.error('Error inserting into database:', err);
        return res.status(500).json({ message: 'Error inserting into database' });
      }

      // User registered successfully
      return res.redirect('/');
    });
  });
});


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
