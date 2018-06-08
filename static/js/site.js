
// Initialize Firebase
const config = {
  apiKey: "AIzaSyCQ8zPyKTCBUnbgTUn3AFtov-gNpzNoRXc",
  authDomain: "petservice-11905.firebaseapp.com",
  databaseURL: "https://petservice-11905.firebaseio.com",
  projectId: "petservice-11905",
  storageBucket: "petservice-11905.appspot.com",
  messagingSenderId: "261768666522"
};
firebase.initializeApp(config)

// global variables go here
const database = firebase.database().ref()
const auth_system = firebase.auth()
var current_page = ""
const page_ref_dict = {
  "home":"home_page",
  "login":"login_page",
}

$(document).ready(()=>{
  console.log('ready')
  init_firebase()
  init_nav_bar()
})

function init_firebase(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log(user.email)
   
      console.log("User loged in")
    } else {
      // User is signed out.
      console.log("User loged out")
    }
  })
}

function init_nav_bar(){
  let nav_bar_div = document.getElementById('nav_bar')
  nav_bar_div.innerHTML =  `
  <nav class="navbar navbar-expand-lg navbar-dark secondary-color">
  <a class="navbar-brand" href="#">Houston's Pet Service Hub</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav" aria-controls="basicExampleNav"
  aria-expanded="false" aria-label="Toggle navigation">
  <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="basicExampleNav">
  <ul class="navbar-nav mr-auto">
  <li class="nav-item active">
  <a class="nav-link" href="index.html">Home
  <span class="sr-only">(current)</span>
  </a>
  </li>
  <li class="nav-item">
  <a class="nav-link" href="login.html">Login</a>
  </li>
  </div>
  </li>
  
  </ul>
  
  </div> 
  </nav>`
}