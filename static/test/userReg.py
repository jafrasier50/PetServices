from selenium import webdriver
driver = webdriver.Chrome()
driver.get("http://127.0.0.1:5500/registeration.html")




def fill_form():
  first_name = driver.find_element_by_id("first_name")
  last_name = driver.find_element_by_id("last_name")
  inputAddress = driver.find_element_by_id("inputAddress")
  inputAddress2 = driver.find_element_by_id("inputAddress2")
  inputCity = driver.find_element_by_id("inputCity")
  inputState = driver.find_element_by_id("inputState")
  inputZip = driver.find_element_by_id("inputZip")
  fileInput = driver.find_element_by_id("myfileinput")
  signup_btn = driver.find_element_by_id("signup_btn")
  emailInput = driver.find_element_by_id("emailInput")
  passInput = driver.find_element_by_id("passInput")
  confirm_passInput = driver.find_element_by_id("confirm_passInput")
  emailInput.send_keys("abdullah.saeed@outlook.com")
  passInput.send_keys("123123")
  confirm_passInput.send_keys("123123")
  first_name.send_keys("Abdullah")
  last_name.send_keys("Saeed")
  inputAddress.send_keys("13333 West rd")
  inputAddress2.send_keys("1623")
  inputCity.send_keys("Houston")
  for option in inputState.find_elements_by_tag_name('option'):
      if option.text == 'Texas':
          option.click() # select() in earlier versions of webdriver
          break
  inputZip.send_keys("77041")
  import os
  ImagePath = os.path.abspath("/Users/abdullah/Desktop/profileImage.jpg")
  fileInput.clear()
  fileInput.send_keys(ImagePath)
# signup_btn.click()