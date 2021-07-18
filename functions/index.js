const functions = require("firebase-functions");
const admin = require("firebase-admin");
const {extract} = require("article-parser");
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.parse = functions.https.onCall((data, context) => {
  const url = data.url;
  return extract(url)
      .then((article) => {
        return {article};
      })
      .catch((err) => {
        return {error: err};
      });
});

exports.getuser = functions.https.onCall((data, context)=> {
  return admin
      .auth()
      .getUser(data.uid)
      .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        return {userRecord};
      })
      .catch((error) => {
        return {error};
      });
});

exports.createMainArchive = functions.auth.user().onCreate((user) => {
  const db = admin.firestore();
  return db.collection("archives")
      .add(
          {title: "Main Archive", emoji: "🗃", publisher: user.uid,
            created: admin.firestore.FieldValue.serverTimestamp(),
            articles: []});
});
