const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword,
    },
});


function sendEmail() {

    let mailOptions = {
        from: 'tuanlm258@gmail.com',
        to: 'leminhtuan2015@gmail.com',
        subject: 'Invite Email',
        text: 'Hello world',
        html: '<b>Hello world?</b>'
    };

    console.log("mailTransport starting")

    mailTransport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("mailTransport error")
            
            return console.log(error);
        }
    });
}

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");

});

exports.sendMail = functions.https.onRequest((request, response) => {
    sendEmail()

    response.send("Sent Email");
});
