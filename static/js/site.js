
// global variables go here
const database = firebase.database().ref()
var storage = firebase.storage().ref()
const user_profiles = database.child("user_profiles")
const auth_system = firebase.auth()


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

