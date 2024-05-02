const mongoose = require('mongoose');

// First stage: SignUp
const signUpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  privacyCheckbox: {
    type: Boolean,
    required: true,
  },
});

// Second stage: Personal information
const personalInfoSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  referralCode: {
    type: String,
    required: true,
  },
  vehicleYear: {
    type: Number,
    required: true,
  },
  vehicleManufacturer: {
    type: String,
    required: true,
  },
  vehicleModel: {
    type: String,
    required: true,
  },
  licensePlate: {
    type: String,
    required: true,
  },
  vehicleColor: {
    type: String,
    required: true,
  },
});

// Third stage: Driver license or JTB form Number
const driverLicenseSchema = new mongoose.Schema({
  driverLicenseOrJTB: {
    type: String,
    required: true,
  },
});

// Fourth stage: Upload Documents
const uploadDocumentsSchema = new mongoose.Schema({
  ridersCard: String,
  MOTLicense: String,
  driverLicense: String,
  driverProfilePhoto: String,
  exteriorPhoto: String,
  interiorPhoto: String,
  proofOfCarOwnership: String,
  roadworthinessCertificate: String,
  vehicleInsuranceCertificate: String,
  residentCard: String,
  driverInstituteRecertification: String,
});

// Review stage
const reviewSchema = new mongoose.Schema({
  reviewStatus: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
});

// Combine sub-schemas into main deliveryAgent schema
const deliveryAgentSchema = new mongoose.Schema({
  signUpInfo: signUpSchema,
  personalInfo: personalInfoSchema,
  driverLicenseInfo: driverLicenseSchema,
  uploadDocuments: uploadDocumentsSchema,
  review: reviewSchema,
});

const DeliveryAgent = mongoose.model('DeliveryAgent', deliveryAgentSchema);

module.exports = DeliveryAgent;
