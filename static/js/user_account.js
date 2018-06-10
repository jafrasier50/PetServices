let user_profile

let current_pet_profile
let updates = {}
let pets_list = document.getElementById("pets_list")

setTimeout(function() {
  user = auth_system.currentUser
  get_user_profile(user.uid)
  pet_observers()
},1000)



function add_new_pet(user, pet_profile_pic_input, pet_name_input, pet_type_input, pet_description_input){
  console.log("lets hope this works")
  pet_profile_pic = pet_profile_pic_input
  pet_name = pet_name_input.val()
  pet_type = pet_type_input.val()
  pet_description = pet_description_input.val()
  
  
  let new_pet_profile = {
    user : user.uid,
    pet_name : pet_name, 
    pet_type : pet_type, 
    pet_description : pet_description, 
    
  }
  
  new_pet_key = pet_profiles.push().key
  new_pet_profile["pk"]=new_pet_key
  current_pet_profile = new_pet_profile
  // add_pet_to_user(new_pet_key)

  pet_img_url = upload_profile_pic(user,new_pet_key,pet_profile_pic_input)
    

  pet_name_input.val("")
  pet_type_input.val("")
  pet_description_input.val("")


}

function inject_profile_img(){
  img_div_to_inject = `
  <img class="img-fluid" width="150px" src=${user_profile.profile_img_url} alt="Sample image">
          <a>
            <div class="mask rgba-white-slight"></div>
          </a>
  `
  img_div = document.getElementById("profile_img")
  img_div.innerHTML = img_div_to_inject
}

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
  }).then(function(data){
    data.forEach(function(user){
      user_profile = user.val()
      inject_profile_img()
    })
    
  })
  

}





function upload_profile_pic(user,new_pet_key,pet_profile_pic_input){

  files = pet_profile_pic_input.files
  allowedFileTypes = ["image/png", "image/jpeg", "image/gif", "image/jpg"]
  for (i=0; i< files.length; i++){
    if(allowedFileTypes.indexOf(files[i].type) > -1){
      let file = files[i]

      let uploadTask = storage.child("images/pet/"+new_pet_key+"/"+file.name).put(file)
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
          current_pet_profile["pet_img_url"] = downloadURL

          updates[new_pet_key] = current_pet_profile
          pet_profiles.update(updates)  

          $("#add_new_pet_modal").modal('hide')



          // window.location = "user_account.html"
        });
      });

}
  }}


function pet_observers(){
  console.log("Pet_boservers were called")
  pet_profiles.orderByChild("user").equalTo(user.uid).on("value",function(snapshot){
    pets = []
    for(let key in snapshot.val()){
      let pet_item = snapshot.val()[key]
      pets.push(pet_item)
      console.log("pets are being observered")
    }
    update_pets_list(pets)
  })
}

function update_pets_list(pets){
  pets_list.innerHTML = ''

  pets.forEach((pet)=>{
    user_pet = `      <!-- Card Wider -->
    <div class="card card-cascade wider col-md-3 mt-3">
    
      <!-- Card image -->
      <div class="view view-cascade overlay">
        <img class="card-img-top" src="${pet.pet_img_url}" alt="Card image cap">
        <a href="#!">
          <div class="mask rgba-white-slight"></div>
        </a>
      </div>
    
      <!-- Card content -->
      <div class="card-body card-body-cascade text-center">
    
        <!-- Title -->
        <h4 class="card-title"><strong>${pet.pet_name}</strong></h4>
        <!-- Subtitle -->
        <h5 class="blue-text pb-2"><strong>${pet.pet_type}</strong></h5>
        <!-- Text -->
        <p class="card-text">${pet.pet_description}</p>
    
      </div>`
    pets_list.innerHTML += user_pet
  })
  

}