



      // Call Geocode
      //geocode();

      // Get location form
      var locationForm = document.getElementById('location-form');
      var userInfoData = []


      // Listen for submit
      locationForm.addEventListener('submit', geocode)

function geocode(e){
   e.preventDefault();

let userName = document.getElementById("userName").value
let petType = document.getElementById("petType").value
let userAddress = document.getElementById("location-input").value;


userInfoData.push({name: userName,
   pet: petType,
   address: userAddress})

console.log(userInfoData)


          axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
            params:{
              address: userAddress,
              key:'AIzaSyBpnwyTOLEQnBi5vevvMJmGp9bWgif5zLo'
            }
          })
          .then(function(response){
            // Log full response
            console.log(response);

            // Formatted Address
            var formattedAddress = response.data.results[0].formatted_address;
            var formattedAddressOutput = `
              <ul class="list-group">
                <li class="list-group-item">${formattedAddress}</li>
              </ul>
            `;

            // Address Components
            var addressComponents = response.data.results[0].address_components;
            var addressComponentsOutput = '<ul class="list-group">';
            for(var i = 0;i < addressComponents.length;i++){
              addressComponentsOutput += `
                <li class="list-group-item"><strong>${addressComponents[i].types[0]}</strong>: ${addressComponents[i].long_name}</li>
              `;
            }
            addressComponentsOutput += '</ul>';

            // Geometry
            var thomasAddress = response.data.results[0].geometry.location

            console.log(thomasAddress)
            var lat = response.data.results[0].geometry.location.lat;

            var lng = response.data.results[0].geometry.location.lng;

            var geometryOutput = `
              <ul class="list-group">
                <li class="list-group-item"><strong>Latitude</strong>: ${lat}</li>
                <li class="list-group-item"><strong>Longitude</strong>: ${lng}</li>
              </ul>
            `

            // Output to app
            document.getElementById('formatted-address').innerHTML = formattedAddressOutput;
            document.getElementById('address-components').innerHTML = addressComponentsOutput;
            document.getElementById('geometry').innerHTML = geometryOutput;
            console.log(userInfoData)
            let x = response.data.results[0].geometry.location
            console.log(x)
            return response.json()
            // for(let x = 1; x<4; x++){
            //   console.log(userInfoData.userAddress.)
            //
            // }
          })
          .catch(function(error){
            console.log(error);
          })
          //alows the forms to clear after submitting it
          let nameField = $("#userName")
          let addressField = $("#location-input")
          let petTypeField = $("#petType")

          nameField.val("")
          addressField.val("")
          petTypeField.val("")
        }.then(json) {
          console.log(json)
        }


        var letsRef = document.getElementById('letsRef');

        var injectObjectStuff = document.getElementById('injectObjectStuff')


        letsRef.addEventListener('submit', showMeTheStuff)

        function showMeTheStuff(e){
           e.preventDefault();
           console.log(userInfoData.length)
           console.log(userInfoData[1].address)

           let tryRef = `<p>This is what it looks like: ${userInfoData[1].address}</p>`
           console.log(tryRef)
           injectObjectStuff.innerHTML += tryRef
         }

/////////////////
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
