// emailService.js

const nodemailer = require('nodemailer');
const generateVerificationCode = require('../utils/generateVerificationCode');

// Function to send verification email
async function sendVerificationEmail(email, verificationCode) {
  // Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: 'mail.royalequitytrust.com', // Your SMTP server hostname
    port: 587, // Port number for SMTP (typically 587 for TLS/STARTTLS)
    secure: false, // Set to true if you're using SSL/TLS
    auth: {
      user: 'testing@royalequitytrust.com', // Your email address
      pass: '@@123Zxc$$', // Your email password
    },
  });

  // Define email options
  const mailOptions = {
    from: 'Sopra <testing@royalequitytrust.com>',
    to: email,
    subject: 'Verification Code',
    text: `Your verification code is: ${verificationCode}`,
  };

  // Send the email
  await transporter.sendMail(mailOptions);

  return verificationCode; // Return the verification code for further processing
}

module.exports = sendVerificationEmail;