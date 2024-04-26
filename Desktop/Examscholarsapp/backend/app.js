const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const database = require('./config/database');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Connect to the database
database.connect();

// Routes
const apiRoutes = require('./app/routes/apiRoutes');
app.use('/api', apiRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
