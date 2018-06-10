let database_images = storage.child("images")


let fileInput = document.getElementById("myfileinput")
let emailInput = $("#emailInput")
let passInput = $("#passInput")
let confirm_passInput = $("#confirm_passInput")
let first_name_input = $("#first_name")
let last_name_input = $("#last_name")
let inputAddress_input = $("#inputAddress")
let inputAddress2_input = $("#inputAddress2")
let inputCity_input = $("#inputCity")
let inputState_input = $("#inputState")
let inputZip_input = $("#inputZip")
let signup_btn = $("#signup_btn")
let current_user_profile = {}
let updates = {}
let new_user_key



signup_btn.click(()=>{
  if (passInput.val() == confirm_passInput.val()){

    firebase.auth().createUserWithEmailAndPassword(emailInput.val(), passInput.val()).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage)

    });
    
  }else{
    //passwords dont match
    alert("password do not match please make sure they are the same. I bet your pet could have done this and not F*****d up this bad.")
  }
})

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

    first_name = first_name_input.val()
    last_name = last_name_input.val()
    inputAddress = inputAddress_input.val()
    inputAddress2 = inputAddress2_input.val()
    inputCity = inputCity_input.val()
    inputState = inputState_input.val()
    inputZip = inputZip_input.val()
    add_new_user_proile(user, first_name, last_name, inputAddress, inputAddress2, inputCity, inputState, inputZip)
    console.log("StopHere")
    

  } else {

  }
});


function add_new_user_proile(user, first_name, last_name, inputAddress, inputAddress2, inputCity, inputState, inputZip){

  let new_user_profile = {
    user :user.uid,
    first_name : first_name,
    last_name : last_name,
    inputAddress : inputAddress,
    inputAddress2 : inputAddress2,
    inputCity : inputCity,
    inputState : inputState,
    inputZip : inputZip,

  }
  
  current_user_profile = new_user_profile
	new_user_key = user_profiles.push().key
  
  new_user_profile["pk"]=new_user_key
  userAddress = make_user_address(inputAddress, inputAddress2, inputCity, inputState, inputZip)
  axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
        params:
        {
          address: userAddress,
          key: 'AIzaSyBpnwyTOLEQnBi5vevvMJmGp9bWgif5zLo'
        }
      })
      .then(function(response){
        cords = response.data.results["0"].geometry.location
        console.log("this is geocode working:" + cords.lat)
        new_user_profile["cords"] = cords
        current_user_profile["cords"] = cords 
        let imgFormat = get_image_format(fileInput)
        console.log("This is the image format: " + imgFormat)
        profile_img_url = upload_profile_pic(user,imgFormat)
      
      })      
        .catch(function(error){
        console.log(error);
      })
                
    
  
  
}


function get_image_format(fileInput){
  spiltPath = fileInput.value.split("\\")
  image_format = spiltPath[spiltPath.length - 1].split(".")[1]
  console.log(image_format)
  return image_format
}

function make_user_address(inputAddress, inputAddress2, inputCity, inputState, inputZip){
  if(inputAddress2 == ""){
    let userAddress = inputAddress+","+inputCity+","+inputState+","+inputZip
    return userAddress
  }else{
    let userAddress = inputAddress+","+inputAddress2+","+inputCity+","+inputState+","+inputZip
    return userAddress
  }
}



// function upload_profile_pic(user,imgFormat){

//   files = myfileinput.files
//   allowedFileTypes = ["image/png", "image/jpeg", "image/gif", "image/jpg"]
//   for (i=0; i< files.length; i++){
//     if(allowedFileTypes.indexOf(files[i].type) > -1){
//       let file = files[i]
      
//       storage.child("images/users/"+user.uid+"/profileimg"+"."+imgFormat).put(file)
//       .catch((error)=>{
//         console.log("This is a pic upload error:" + error)
//       })
//     }else{
//         alert("The image is of invalid format. Only .png .jpeg and .gif are allowed")
//     }
//   }
// }


function upload_profile_pic(user,imgFormat){

  files = myfileinput.files
  allowedFileTypes = ["image/png", "image/jpeg", "image/gif", "image/jpg"]
  for (i=0; i< files.length; i++){
    if(allowedFileTypes.indexOf(files[i].type) > -1){
      let file = files[i]
      
      let uploadTask = storage.child("images/users/"+user.uid+"/"+file.name).put(file)
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function(snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        }, function(error) {

        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;

          case 'storage/canceled':
            // User canceled the upload
            break;



          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, function() {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {

          console.log('File available at', downloadURL);
          current_user_profile["profile_img_url"] = downloadURL
        
          updates[new_user_key] = current_user_profile
          user_profiles.update(updates)
          window.location = "user_account.html"
        });
      });
  //     .catch((error)=>{
  //       console.log("This is a pic upload error:" + error)
  //     })
  //   }else{
  //       alert("The image is of invalid format. Only .png .jpeg and .gif are allowed")
  //   }
  // }
}
  }}
