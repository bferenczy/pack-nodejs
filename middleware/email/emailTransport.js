function emailTransport() {
  const nodemailer = require('nodemailer');
  let transport = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
         user: '0b04c4058a4271',
         pass: '4936fe504b9dbe'
      }
  });
  return transport;
}

module.exports = emailTransport;
