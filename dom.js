const guideList = document.querySelector('.guides');
const loggedOutLinks =document.querySelectorAll('.logged-out');
const loggedInLinks =document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');

const setupUI=function(user){
    if (user) {
        if(user.admin){
            adminItems.forEach(function(item){
                return item.style.display ='block'
            })
        }
        // account info
        db.collection('user').doc(user.uid).get().then(function(doc){
            const html = `
        <div>Logged in as ${user.email}</div>
        <div>${doc.data().bio}</div>
        <div class="pink-text">${user.admin ? 'Admin' : ''}</div>
         `;
         accountDetails.innerHTML = html;
        })
        
        // toggle user UI elements
        loggedInLinks.forEach(function(item){return item.style.display = 'block'} );
        loggedOutLinks.forEach(function(item){return item.style.display = 'none'});

      } else {
        adminItems.forEach(function(item){
            return item.style.display ='none'});
          //hide account detail
         accountDetails.innerHTML='';
        // toggle user elements
        loggedInLinks.forEach(function(item){return item.style.display = 'none'});
        loggedOutLinks.forEach(function(item){return item.style.display = 'block'});
      }
}

//setup guides
const setupGuides =function(data){

    if(data.length){
    let html='';
    data.forEach(function(doc) {
        const guide = doc.data();
        const li = `
        <li>
        <div class="collapsible-header grey lighten-4"> ${guide.Title} </div>
        <div class="collapsible-body white"> ${guide.Content} </div>
        </li>
        `;
        html+=li;
    });
    guideList.innerHTML = html
    }
    else{
        guideList.innerHTML='<h5 class="center-align">Login to view the blogs</h5>'
        }
}

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

   
  
  });

 