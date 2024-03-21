/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
//const logger = require("firebase-functions/logger");
// const functions = require('firebase-functions');
// Cloud Firestore
const { Timestamp } = require('firebase-admin/firestore'); 
const admin= require('firebase-admin');
const { error } = require("firebase-functions/logger");
admin.initializeApp();

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// const functions= require("firebase-functions");
// const admin= require('firebase-admin');
// admin.initializeApp();

// exports.createUserAccount = functions.database.ref('/userProfile/{userId}/clientList/{clientId}')
//     .onWrite((change, context) => {
//         const userId = context.params.userId;
//         const clientId = context.params.clientId;

//         // Only handle the creation of new client documents, not updates
//         if (!change.after.exists()) {
//             console.log(`New client created for user ${userId}, clientId: ${clientId}`);

//             // Create a new user in Firebase Authentication
//             return admin.auth().createUser({})
//                 .then(userRecord => {
//                     console.log('Successfully created new user:', userRecord.uid);

//                     // Perform additional tasks if necessary
//                     // For example, store the user ID in the database
//                     return admin.database().ref(`/userProfile/${userId}/clientList/${clientId}/createdUser`).set(userRecord.uid);
//                 })
//                 .catch(error => {
//                     console.error('Error creating new user:', error);
//                     throw error; // Propagate the error to be logged in Firebase console
//                 });
//         } else {
//             console.log(`Client updated for user ${userId}, clientId: ${clientId}`);
//             return null; // No action required for updates
//         }
//     })

//accept comments and mirror it back to user when user posts a comment
// exports.echofunction= onRequest((request, response)=>{
//     response.send(request.query.data);
// });


// const app = express();
// const port = 3000;

//app.use(express.json());

// app.post('/postcomment', (request, response) => {
//   // Access the request body
//   const requestBody = request.body;

//   // Send the request body back as the response
//   response.send(requestBody);
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
//Posting data to server
// exports.postcomment = onRequest((request,response) => {
//    response.send(request.body);
//  });
    

exports.getcomments= onRequest({ cors: true }, (request,response)=>{
        //connect to our firestore database
        let mydata= []
        admin.firestore().collection('comments').orderBy("timestamp","desc").get().then((snapshot)=>{
            if(snapshot.empty){
                console.log("No matching documents");
                response.send({data: 'No data in database'});
                return;
            }

            snapshot.forEach(doc=>{
                mydata.push(Object.assign(doc.data(),{id:doc.id}));
            });

            //send data back to client
            response.send({data:mydata});
        });
 }); 

 exports.postcomment= onRequest({ cors: true }, (request,response)=>{
    const currentTime= Timestamp.now();
        request.body.timestamp=currentTime;
        request.body.likes=0;

        return admin.firestore().collection('comments').add(request.body).then(()=>{
            response.send({data : "Saved in the database"});
        });
});


exports.deletecomment= onRequest({ cors: true },(request, response)=>{
    crossOriginIsolated(request, response,()=>{
        //deletes a comment using the id of the document
        admin.firestore().collection("comments").doc(request.query.id).delete().then(()=>
        {
            response.json({data:"Document successfully deleted"});
        })
    });
 });

 exports.updatecomment= onRequest((request,response)=>{
    crossOriginIsolated(request,response,()=>{
        return
        admin.firestore().collection('comments').doc(request.query.id).update(request.body.data).then(()=>{
            response.json({data:"Updated document in database"});
        });
    });
 });


exports.helloWorld = onRequest({ cors: true },(request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});
