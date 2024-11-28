const { MailerSend, EmailParams, Sender, Recipient } = require('mailersend')


const mailerSend = new MailerSend({
	apiKey: process.env.API_KEY,
});

const sentFrom = new Sender("hello@hourstomax.com", "Hours To Max");

const recipients = [
	new Recipient("reevesdrums@gmail.com", "user")
];

// const htmlContent = `
//   <p>Hello,</p>
//   <p>Welcome to Hours To Max.</p>
//   <p>I made this website to as a way to try and decide what training methods I would use to work on my account goals.</p>
//   <p>There are plenty of calculators and tools available online, but all of them assume you will use the most efficient training methods possible, or 
//   that you have billions of in game gold lying around to spare.</p>
//   <br>
//   <p>This website was designed to let you plan your account but with training methods that you actually enjoy (and that you have the spare gp for).</p>
//   <p>I have a lot of ideas and customisation planned for this, but for now, thanks for signing up to the website and I hope you find it useful and fun.</p>
//   <br>
//   <p>You can email me at reevesgamedev@gmail.com if something is broken or you have a suggestion<p>
//   <p>The site is in early development, so there's lot's being added each day<p>
//   <p>Oh, and I am looking for permanent work as a programmer, so if you like the website and are hiring a node coder, please reach out!<p>
//   <br>
//   <p>Thanks again,<p>
//   <p>Alexander<p>
// `;

// emailParams = new EmailParams()
// 	.setFrom(sentFrom)
// 	.setTo(recipients)
// 	.setReplyTo(sentFrom)
// 	.setSubject("Welcome! Your free trial is ready.")
// 	.setHtml(htmlContent)
// 	.setText("Hey there! Welcome to Your Business, we're happy to have you here! You'll be happy to know that your free trial awaits, all you need to do is head to your account, log in and start playing. Remember to check out our guides and contact support if you need anything. Regards, The Your Business Team");

module.exports = {

  registrationEmail: (accessToken) => {
    myEmailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(sentFrom)
    .setSubject("Hours To Max Account Activation.")
    .setHtml("<p>Welcome to Hours To Max. Follow the link to your new account!</p><br><a href=\"http://localhost:3000/verify?token=" +accessToken+ "\">VERIFY YOUR ACCOUNT</a>")
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