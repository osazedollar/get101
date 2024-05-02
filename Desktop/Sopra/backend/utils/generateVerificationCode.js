// generateVerificationCode.js

// Function to generate a random 6-digit verification code
function generateVerificationCode() {
  const codeLength = 6;
  let code = '';
  for (let i = 0; i < codeLength; i++) {
      code += Math.floor(Math.random() * 10); // Generate a random digit between 0 and 9
  }
  console.log('Generated Verification Code:', code); // Add logging statement to print generated code
  return code;
}


module.exports = generateVerificationCode;
