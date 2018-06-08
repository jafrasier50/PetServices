let user
let user_profile
setTimeout(function() {

  user = auth_system.currentUser
  var user_profile_key = get_user_profile(user.uid)
  console.log(user_profile_key)

},1000)

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    // ...
  } else {
    window.location= "login.html"

  }
});


function get_user_profile(userID){
  user_profiles.orderByChild('user').equalTo(userID).once("value", function (snap){
    console.log(snap.val())
  }).then((data)=>{
    console.log(data.data)

    if (data.numChildren() == 1){
      data.forEach((obj) => {
        user_profile = obj
      })
    }
  })
}

let user_images = storage.child("user_images")

function upload_file_to_firebase(files){
  // files.forEach((file)=>{
    console.log(files)
  // })
}

function processSelectedFiles(fileInput) {
  var files= fileInput.files;
  upload_file_to_firebase(files)
  // user_images.put(file).then(function(snapshot){
  //   console.log("File Uploaded")
  // })


}


// function processSelectedFiles(fileInput) {
//   var files = fileInput.files;

//   for (var i = 0; i < files.length; i++) {
//     alert("Filename " + files[i].name);
//   }
// }





// update and objects fields add new ones or update existing ones
// make a dictionary of the fields and their values

// updateFields = {
//   field1 : "value",
//   field2 : false,
    // ...... and so on
// }

// then just point to it and call update and pass the updateFields obj
// firebaseObjRef.update(updateFields)