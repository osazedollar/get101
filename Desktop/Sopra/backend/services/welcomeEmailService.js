// welcomeEmailService.js

const nodemailer = require('nodemailer');

// Function to send welcome email
async function sendWelcomeEmail(email) {
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
    subject: 'Welcome to Our Service',
    text: 'Welcome to Sopra! We are excited to have you on board.',
  };

  // Send the email
  await transporter.sendMail(mailOptions);
}

module.exports = sendWelcomeEmail;
