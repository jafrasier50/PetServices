
//Call Geocode

//Database Objects
//{id: [{:}]}
var userInfoData = []

//{id: [{:}]}
var petInfoData = []

//{id: [{:}]}
var postsInfoData = []

//Referencing dom elements
var locationForm = document.getElementById("location-form")
var submitButton = document.getElementById("submit")



//listen for submission
submitButton.addEventListener('click', function(){
//Author info input from dom
  let userName = document.getElementById("userName").value
  let userAddress = document.getElementById("location-input").value
// array of animals that they have
  let pets = document.getElementById("petType").value

// array of images url that correspond with their pets
  let profileImg = document.getElementById("petImage").value

  console.log(userName)

  console.log(userAddress)

  axios.get('https://maps.googleapis.com/maps/api/geocode/json', {

    params: {
      address: userAddress,
      key: 'AIzaSyDZk3_wDIHYs9dhafRIcgohlunxKiE1iiw'
      }

    }).then(function(response) {
      console.log(response.data.results[0].formatted_address)
      //var lat= response.data.results[0].geometry.location.lat;
      //var lng = response.data.results[0].geometry.location.lng;
      let userLocation = response.data.results[0].geometry.location

      userInfoData.push({name: userName, address: userAddress, location: userLocation})

      console.log(userInfoData)
})
  //alows the forms to clear after submitting it
  let nameField = $("#userName")
  let addressField = $("#location-input")
  nameField.val("")
  addressField.val("")
})



/*
  var userName1 = document.getElementById("userName").value
  var userAddress1 = document.getElementById("location-input").value
  console.log(userName1)
  console.log(userAddress1)
})
//var userInfoData = {}
*/

/*
function getuserInfo(event){
  let userName = document.getElementById("userName").value
  let userAddress = document.getElementById("location-input").value
  console.log(userName)
  console.log(userAddress)
}

*
  /*
  axios.get('https://maps.googleapis.com/maps/api/geocode/json', {

    params: {
      address: userAddress,
      key: 'AIzaSyDZk3_wDIHYs9dhafRIcgohlunxKiE1iiw'
      }
    }).then(function(response) {
      console.log(response.data.results[0].formatted_address)
      //var lat= response.data.results[0].geometry.location.lat;
      //var lng = response.data.results[0].geometry.location.lng;
      let userLocation = response.data.results[0].geometry.location

      userInfoData.push({name: userName, address: userAddress, location: userLocation})

      console.log(userInfoData)
      //return response.json()
    })
  }
    */




/*


//geocode()
function geocode(e){
  //when button press, it sends submit to website api, but we want to catch
  //submission first
  //prevent actual submit
  e.preventDefault()

  //var location = '3302 Canal St, Houston, TX 77003'
  //need to put value there or else it gives you a tag
  var location = document.getElementById("location-input").value
  axios.get('https://maps.googleapis.com/maps/api/geocode/json', {

    params: {
      address: location,
      key: 'AIzaSyDZk3_wDIHYs9dhafRIcgohlunxKiE1iiw'
      }
    })
    .then(function(response){
      // Log full response
      console.log(response)
      console.log(response.data.results[0].formatted_address)

      var formattedAddress = response.data.results[0].formatted_address
      var formattedAddressOutput =
      `
      <ul class = "list-group">
        <li class="list-group-item">${formattedAddress}</li>
      </ul>
      `

      //Address Components
      var addressComponents = response.data.results[0].address_components

      //make element for dom to make list of components of address
      var addresscomponentsOutput = '<ul class="list-group">'


      //loop through address components(has 9 items), different forms of address
      for(var i = 0; i< addressComponents.length; i++) {
        addresscomponentsOutput += `
          <li class = "list-group-item"><strong>${addressComponents[i].types[0]}</strong>: ${addressComponents[i].long_name}</li>
        `
      }

      addresscomponentsOutput += '</ul>'
      //console.log(addressComponents)
      //Geomery
      var lat= response.data.results[0].geometry.location.lat;
      var lng = response.data.results[0].geometry.location.lng;

      var geometryOutput =
      `
      <ul class = "list-group">
        <li class = "list-group-item"><strong>Latitude</strong>: ${lat}</li>
        <li class = "list-group-item"><strong>Longitude</strong>: ${lng}</li>
      </ul>
      `

      //var addressComponents.Output = 'ul class = "list-group">'


      //Output to app
      document.getElementById('formatted-address').innerHTML = formattedAddress
      document.getElementById('address_components').innerHTML = addresscomponentsOutput
      document.getElementById('geometry').innerHTML = geometryOutput

      //return response.json()
    })
    .catch(function(error){
      console.log(error);
    })
}

*/





  function initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: {lat: 29.752870, lng: -95.339075}
    });

    // Create an array of alphabetical characters used to label the markers.
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // Add some markers to the map.
    // Note: The code uses the JavaScript Array.prototype.map() method to
    // create an array of markers based on a given "locations" array.
    // The map() method here has nothing to do with the Google Maps API.
    var markers = locations.map(function(location, i) {
      return new google.maps.Marker({
        position: location,
        label: labels[i % labels.length]
      });
    });

    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(map, markers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
  }
  var locations = [
    {lat: 29.733768, lng: -95.465904},
    {lat: 29.738485, lng: -95.496913},
    {lat: 29.732202, lng: -95.489620},
  ]


////https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
