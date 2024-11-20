const crypto = require('crypto');

const generateInviteLink = (filmId) => {
    const baseURL = process.env.NODE_ENV === 'production' 
      ? 'https://www.yourdomain.com' 
      : 'http://localhost:3000';
    const token = crypto.randomBytes(32).toString('hex'); // Secure unique token
    return `${baseURL}/invite/${filmId}/${token}`;
  };

module.exports = generateInviteLink;