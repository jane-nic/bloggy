//add admin cloud function
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', function(e){
  e.preventDefault();
  const adminEmail = document.querySelector('#admin-email').value;
  const addAdminRole = functions.httpsCallable('addAdminRole');
  addAdminRole({email:adminEmail}).then(function(result){
    console.log(result);
  })
})

  
// listen for auth status changes
auth.onAuthStateChanged(function(user) {
  if (user) {
    user.getIdTokenResult().then(function(idTokenResult){
      user.admin=idTokenResult.claims.admin;
      setupUI(user);
    });
    db.collection('blogs').onSnapshot(function(snapshot) {
      setupGuides(snapshot.docs);

    
  });
 } else {
    setupUI();
    setupGuides([]);
  }
});

// create new guide
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', function(e) {
  e.preventDefault();
  db.collection('blogs').add({
    Title: createForm.title.value,
    Content: createForm.content.value
  }).then(function() {
    // close the create modal & reset form
    const modal = document.querySelector('#modal-create');
    M.Modal.getInstance(modal).close();
    createForm.reset();
  }).catch(function(err) {
    console.log(err.message);
  });
});

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', function(evt){
  evt.preventDefault();
  
  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;
    //signup user
    auth.createUserWithEmailAndPassword(email,password).then(function(cred) {
     return db.collection('user').doc(cred.user.uid).set({
       bio:signupForm['signup-bio'].value
     });
      
    }).then(function(){
         // close the signup modal & reset form
     const modal = document.querySelector('#modal-signup');
     M.Modal.getInstance(modal).close();
     signupForm.reset();  
     signupForm.querySelector('.error').innerHTML ='';
    }).catch(function(err){
      signupForm.querySelector('.error').innerHTML =err.message;
    })
});

// logout
const logout = document.querySelector('#confirm');
logout.addEventListener('click', function(evt) {
 
  auth.signOut().then(function(){
    // close the logout modal & reset form
const modal = document.querySelector('#modal-logout');
M.Modal.getInstance(modal).close();
});
 
});

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
// get user info
const email = loginForm['login-email'].value;
const password = loginForm['login-password'].value;

// log the user in
    auth.signInWithEmailAndPassword(email, password).then(function(cred) {
    
// close the login modal & reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
    loginForm.querySelector('.error').innerHTML ='';
    }).catch(function(err){
      loginForm.querySelector('.error').innerHTML =err.message;
    })
});
