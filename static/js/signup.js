

let emailInput = $("#emailInput")
let passInput = $("#passInput")
let confirm_passInput = $("#confirm_passInput")
let signupBtn = $("#signupBtn")

signupBtn.click(()=>{
  if (passInput.val() == confirm_passInput.val()){

    firebase.auth().createUserWithEmailAndPassword(emailInput.val(), passInput.val()).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
    
  }else{
    //passwords dont match
    alert("password do not match please make sure they are the same. I bet your pet could have done this and not F*****d up this bad.")
  }
})


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    
    // ...
  } else {
    // User is signed out.
    // ...
  }
});
