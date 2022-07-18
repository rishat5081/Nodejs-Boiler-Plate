"use strict";
var nodemailer = require("nodemailer");

module.exports = {
  sendEmail: async (userEmail, subject) => {
    return new Promise(async (resolve, rejected) => {
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: process.env.smtpHost,
        port: process.env.smtpPort,
        secure: process.env.smtpSecure,
        auth: {
          user: process.env.smtpUser,
          pass: process.env.smtpPass,
        },
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: `"${process.env.web_Title}" ${process.env.web_Email}`, // sender address
        to: `${userEmail}`, // list of receivers
        subject: `${subject}`, // Subject line
        text: "Hello world?", // plain text body
        html: `${"htmlFile"}`, // html body
      });

      if (info) resolve({ status: true, message: "Email is Sent" });
      else rejected({ status: false, message: "Error Sending Email" });
    });
  },
};

console.log("", process.env);
