// emailService.js

const nodemailer = require('nodemailer');

// Create a Nodemailer transporter with your SMTP settings
const transporter = nodemailer.createTransport({
  host: 'mail.royalequitytrust.com', // SMTP server hostname
  port: 587, // Port for SMTP (587 for TLS, 465 for SSL)
  secure: false, // True for 465, false for other ports
  auth: {
    user: 'apptesting@royalequitytrust.com', // Your email address
    pass: '@@123Zxc$$' // Your email password or app-specific password
  }
});

module.exports = {
  async sendSignupEmail(userEmail) {
    const mailOptions = {
      from: 'ExamScholarApp <apptesting@royalequitytrust.com>',
      to: userEmail,
      subject: 'Welcome to Exam Scholars!',
      text: 'Thank you for registering with Exam Scholars. We look forward to helping you prepare for your exams.'
    };

    await transporter.sendMail(mailOptions);
  }
};
