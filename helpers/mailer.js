const { MailerSend, EmailParams, Sender, Recipient } = require('mailersend')


const mailerSend = new MailerSend({
	apiKey: process.env.API_KEY,
});

const sentFrom = new Sender("hello@hourstomax.com", "Hours To Max");

const recipients = [
	new Recipient("reevesdrums@gmail.com", "user")
];

module.exports = {

  registrationEmail: (registrationToken, recipientEmail) => {
    myEmailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo([new Recipient(recipientEmail)])
    .setReplyTo(sentFrom)
    .setSubject("Hours To Max Account Activation.")
    .setHtml("<p>Welcome to Hours To Max. Follow the link to your new account!</p><br><a href=\"http://localhost:3000/verify?token=" +registrationToken+ "\">VERIFY YOUR ACCOUNT</a>")
    .setText("");
  
    mailerSend.email.send(myEmailParams)
    .then(response => {
      console.log("Email sent successfully:", response);
    })
    .catch(error => {
      console.error("Error sending email:", error);
    })
  },
  oopsEmail: (resetToken, recipientEmail) => {
    myEmailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo([new Recipient(recipientEmail)])
    .setReplyTo(sentFrom)
    .setSubject("Hours To Max Password Reset.")
    .setHtml("<p>Welcome to Hours To Max. Follow the link to reset your password. If you did not request this reset, you can ignore this email.</p><br><a href=\"http://localhost:3000/newpassword?token=" +resetToken+ "\">RESET YOUR PASSWORD</a>")
    .setText("");
  
    mailerSend.email.send(myEmailParams)
    .then(response => {
      console.log("Email sent successfully:", response);
    })
    .catch(error => {
      console.error("Error sending email:", error);
    })
  }
}