
// global variables go here
const database = firebase.database().ref()
const storage = firebase.storage().ref()
const user_profiles = database.child("user_profiles")
const pet_profiles = database.child("pet_profiles")
const auth_system = firebase.auth()
const database_images = storage.child("images")


setTimeout(function() {

  var user = auth_system.currentUser
  home_page_script(user)
},1000)

function home_page_script(user){

  if (user == null ){
    $("#login_link").removeClass().addClass("show_this nav-item")
    $("#logout_link").removeClass().addClass("hide_this nav-item")

  }else{
    $("#login_link").removeClass().addClass("hide_this nav-item")
    $("#logout_link").removeClass().addClass("show_this nav-item")
    $("#account_manage_link").removeClass().addClass("show_this nav-item")

  }
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


