let user_profile

setTimeout(function() {

  user = auth_system.currentUser
  get_user_profile(user.uid)


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
  }).then(function(data){
    data.forEach(function(user){
      user_profile = user.val()
    })
    
  })
}




// // update and objects fields add new ones or update existing ones
// // make a dictionary of the fields and their values

// // updateFields = {
// //   field1 : "value",
// //   field2 : false,
//     // ...... and so on
// // }

// // then just point to it and call update and pass the updateFields obj
// // firebaseObjRef.update(updateFields)

// let profileimg_url
// get_profile_img_url(user,imgFormat)
// new_user_profile["profile_img_url"] = profileimg_url
// function get_profile_img_url(user, imgFormat){
//   profileimgRef = storage.child("images/users/"+user.uid+"/profileimg"+"."+imgFormat)
//   profileimgRef.getDownloadURL().then(function(url){
//     profileimg_url = url
//     console.log("this is the img url: "+profileimg_url)
//     console.log("this is the url from promise:" +url)
//   }).catch((error)=>{
//     console.log(error)
//   })

// }
