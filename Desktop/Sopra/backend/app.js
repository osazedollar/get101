const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const signupRoutes = require('./routes/signupRoutes');
const personalInfoRoutes = require('./routes/personalInfoRoutes');
const driverLicenseRoutes = require('./routes/driverLicenseRoutes');
const uploadDocumentsRoutes = require('./routes/uploadDocumentsRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const userProfileRoutes = require('./routes/userProfileRoutes'); // Import userProfileRoutes module
const geocodingController = require('./controllers/geocodingController');
const appFeatures = require('./routes/appFeatures'); // Import appFeatures modules
const bodyParser = require('body-parser');


const path = require('path');
const { info } = require('console');

// Route for geocoding
//router.get('/geocode', geocodingController.geocodeAddress);

// Serve static files from the 'views' directory
app.use(express.static(path.join(__dirname, 'views')));

app.get('/create-points', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'googlemap.html'));
});

app.get('/register-delivery-agent', (req, res) => {
  try {
    // Determine the current stage of the registration process
    const currentStage = req.query.stage || 'signup' ; // Default to the first stage if no stage is provided

    // Construct the absolute path to the HTML file for the current stage
    const filePath = path.join(__dirname, 'views', `${currentStage}.html`);

    // Send the HTML file as a response
    res.sendFile(filePath);
  } catch (error) {
    // Handle any errors that occur during file serving
    console.error(`Error serving ${currentStage}.html:`, error);
    res.status(500).send('Internal Server Error');
  }
});

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECT,)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });


// Middleware
app.use(express.json());
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


// Routes
app.use('/api/signup', signupRoutes);
app.use('/api/personal-info', personalInfoRoutes);
app.use('/api/driver-license', driverLicenseRoutes);
app.use('/api/upload-documents', uploadDocumentsRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api', appFeatures);
app.use('/api/userProfile', userProfileRoutes);


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


//signature: Great things with small beginnings.
