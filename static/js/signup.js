

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
    add_new_user_proile(user)

    window.location = "user_account.html"
    // ...
  } else {

  }
});




function add_new_user_proile(user){
  let new_user_profile = {
    user:user.uid,
		first_login: true,
	}
	let new_user_key = user_profiles.push().key
  let updates = {};
  new_user_profile["pk"]=new_user_key
  updates[new_user_key] = new_user_profile
  console.log(updates)
  user_profiles.update(updates)
  
}