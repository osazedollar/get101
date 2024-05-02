const express = require('express');
const router = express.Router();
const DeliveryAgent = require('../models/deliveryAgent');


// Fourth stage: Upload Documents
router.post('/', async (req, res) => {
  try {
    // Extract uploaded documents from request body
    const {
      ridersCard,
      MOTLicense,
      driverLicense,
      driverProfilePhoto,
      exteriorPhoto,
      interiorPhoto,
      proofOfCarOwnership,
      roadworthinessCertificate,
      vehicleInsuranceCertificate,
      residentCard,
      driverInstituteRecertification
    } = req.body;

    // You can save these document URLs to the delivery agent's document fields in the database
    // For example:
    const deliveryAgent = await DeliveryAgent.findById(req.user.deliveryAgentId);
    deliveryAgent.ridersCard = ridersCard;
    deliveryAgent.MOTLicense = MOTLicense;
    deliveryAgent.driverLicense = driverLicense;
    deliveryAgent.driverProfilePhoto = driverProfilePhoto;
    deliveryAgent.exteriorPhoto = exteriorPhoto;
    deliveryAgent.interiorPhoto = interiorPhoto;
    deliveryAgent.proofOfCarOwnership = proofOfCarOwnership;
    deliveryAgent.roadworthinessCertificate = roadworthinessCertificate;
    deliveryAgent.vehicleInsuranceCertificate = vehicleInsuranceCertificate;
    deliveryAgent.residentCard = residentCard;
    deliveryAgent.driverInstituteRecertification = driverInstituteRecertification;

    await deliveryAgent.save();

    res.status(200).json({ message: 'Documents uploaded successfully' });
  } catch (error) {
    console.error('Error uploading documents:', error);
    res.status(500).json({ message: 'Error uploading documents' });
  }
});




module.exports = router;

// Add routes for other stages of delivery agent registration
