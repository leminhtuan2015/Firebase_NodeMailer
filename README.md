## Firebase Cloud Functions + Node Mailer
## Firebase Cloud Functions + Algolia = full text search on firebase database

-----------------------------------------------------------------

## Firebase Cloud Functions + Node Mailer

* Firebase Functions
* Node Mailer : https://nodemailer.com/about/
* Algolia - search : https://github.com/algolia/algoliasearch-client-javascript

```js
npm install nodemailer --save

npm install algoliasearch --save

```
   


### Setting up the sample

* Create a Firebase Project using the [Firebase Console](https://console.firebase.google.com).
* You must have the Firebase CLI installed. If you don't have it install it with `npm install -g firebase-tools` and then configure it with `firebase login`.
* Configure the CLI locally by using `firebase use --add` and select your project in the list.
* Install Cloud Functions dependencies locally by running: `cd functions; npm install; cd -`
* To be able to send emails with your Gmail account: 
   * enable access to [Less Secure Apps](https://www.google.com/settings/security/lesssecureapps) 
   * [Display Unlock Captcha](https://accounts.google.com/DisplayUnlockCaptcha). 
   * For accounts with 2-step verification enabled [Generate an App Password](https://support.google.com/accounts/answer/185833).
* Set the `gmail.email` and `gmail.password` Google Cloud environment variables to match the email and password of the Gmail account used to send emails (or the app password if your account has 2-step verification enabled). For this use:

    ```bash
    firebase functions:config:set gmail.email="myusername@gmail.com" gmail.password="secretpassword"
    ```

### Deploy and test

* This sample comes with a web-based UI for testing the function. To test it out:

  * Deploy your project using `firebase deploy`
  * Open the app using `firebase open hosting:site`, this will open a browser.

### Run

* Open link in browser:

  * https://us-central1-[Project-ID].cloudfunctions.net/sendMail
  
## Firebase Cloud Functions + Algolia = full text search on firebase database

### Setting up the sample

* Create an Algolia account at www.algolia.com.

* Set the algolia.app_id and algolia.api_key Google Cloud environment variables to match the Algolia application ID and API key of your account. For this use:


```bash

firebase functions:config:set algolia.app_id="myAlgoliaAppId" algolia.api_key="myAlgoliaApiKey"

```

