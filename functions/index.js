const functions = require('firebase-functions');
const admin = require('firebase-admin');

const nodemailer = require('nodemailer');
const algoliasearch = require('algoliasearch');

//------------------------- EMAIL CONFIG
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword,
    },
});
//------------------------- END EMAIL CONFIG


//------------------------- ALGOLIA SEARCH CONFIG
const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
const ALGOLIA_SEARCH_KEY = functions.config().algolia.search_key;

const ALGOLIA_INDEX_NAME = 'users';
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
const index = client.initIndex(ALGOLIA_INDEX_NAME);

//------------------------- END ALGOLIA SEARCH CONFIG


function sendEmail(toEmailAddress, emailSubject, emailHtmlContent) {

    let mailOptions = {
        from: functions.config().gmail.email,
        to: toEmailAddress ? toEmailAddress : 'leminhtuan2015@gmail.com',
        subject: emailSubject ? emailSubject : 'Invite Email',
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

function search(query = 'Some text', callback) {
    console.log("query : " + query)

    index.search({query}).then(responses => {
        // Response from Algolia:
        // https://www.algolia.com/doc/api-reference/api-methods/search/#response-format
        console.log("search responses : " + JSON.stringify(responses));
        console.log(responses.hits);

        callback(responses.hits)

        return responses.hits
    }).catch((error) => {
        console.log("search error" + JSON.stringify(search));
    })
}


//------------------------------------------EXPORT

exports.indexentry = functions.database.ref('/users/{userId}/name').onWrite((event) => {
    const firebaseObject = {
        text: event.data.val(),
        objectID: event.params.userId,
    };

    return index.saveObject(firebaseObject).then(
        () => event.data.adminRef.parent.child('last_index_timestamp').set(
            Date.parse(event.timestamp)));
});

exports.search = functions.https.onRequest((request, response) => {
    let query = request.query.query

    search(query, (resutls) => {
        console.log("search get results" + JSON.stringify(resutls));
        response.send(JSON.stringify(resutls));
    })

});

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");

});

exports.sendMail = functions.https.onRequest((request, response) => {
    let toEmailAddress = request.body.toEmailAddress
    let emailSubject = request.body.emailSubject
    let emailHtmlContent = request.body.emailHtmlContent

    console.log("sendMail options => toEmailAddress: " + toEmailAddress + " emailSubject : " + emailSubject + " emailHtmlContent :" + emailHtmlContent)

    sendEmail(toEmailAddress, emailSubject, emailHtmlContent)

    response.send("Sent Email");
});
