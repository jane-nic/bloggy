const functions = require('firebase-functions');
const admin =require('firebase-admin');
admin.initializeApp();

exports.addAdminRole = functions.https.onCall(function(data,context){
    //check request is made by an admin
    if(context.auth.token.admin!== true){
        return {error: 'only admin can add admin'}
    }
    //get user and add custom claim
    return admin.auth().getUserByEmail(data.email).then(function(user){
        return admin.auth().setCustomUserClaims(user.uid,{
           admin:true 
        });
    }).then(function(){
        return {
            message:'success! $(data.email) has been made an admin'
        }
    });

})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
