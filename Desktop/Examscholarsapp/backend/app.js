const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const database = require('./config/database');
const methodOverride = require('method-override');
const adminRoutes = require('./app/routes/adminRoutes');

const http = require('http');
const socketIo = require('socket.io');


const server = http.createServer(app);
const io = socketIo(server);

//Import and use chat module
const chat = require('./chat/chatapp');
chat(io);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(methodOverride('_method'));

// Connect to the database
database.connect();

// Routes
const userRoutes = require('./app/routes/userRoutes');
const apiRoutes = require('./app/routes/apiRoutes'); // Assuming apiRoutes handles other API endpoints

app.use('/api/users', userRoutes);
app.use('/admin', adminRoutes);
app.use('/api', apiRoutes);

// Error handling middleware
app.use(require('./app/utils/errorHandler'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});