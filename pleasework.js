
              var pet_profile_pic_input = document.getElementById("pet_profile_pic")
              var pet_name_input = $("#pet_name")
              var pet_type_input = $("#pet_type")
              var pet_description_input = $("#pet_description")
              var save_pet_btn = $("#save_pet_btn")
              save_pet_btn.click(()=>{
                console.log("clicked")
                add_new_pet(user, pet_profile_pic_input, pet_name_input, pet_type_input, pet_description_input)
              })            
              
              
              