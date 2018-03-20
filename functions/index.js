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


function sendEmail(toEmailAddress, emailSubject, emailHtmlContent) {

    let mailOptions = {
        from: functions.config().gmail.email,
        to: toEmailAddress ? toEmailAddress :'leminhtuan2015@gmail.com',
        subject: emailSubject? emailSubject : 'Invite Email',
        text: 'Hello world',
        html: emailHtmlContent ? emailHtmlContent : '<b>Hello world?</b>'
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
    let toEmailAddress = request.query.toEmailAddress
    let emailSubject = request.query.emailSubject
    let emailHtmlContent = request.query.emailHtmlContent

    console.log("sendMail options => toEmailAddress: " + toEmailAddress + " emailSubject : " + emailSubject + " emailHtmlContent :" + emailHtmlContent)

    sendEmail(toEmailAddress, emailSubject, emailHtmlContent)

    response.send("Sent Email");
});
