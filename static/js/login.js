let emailInput = $("#emailInput") 
let passInput = $("#passInput") 
let loginBtn = $("#loginBtn") 

loginBtn.click(()=>{
  email = emailInput.val()
  password = passInput.val()
  auth_system.signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage)
    // ...
  });
  emailInput.val("")
  passInput.val("")
})

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    window.location = "index.html"
    // ...
  } else {
    // User is signed out.
    // ...
  }
});

