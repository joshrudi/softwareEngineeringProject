from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from colorama import init
from colorama import Fore, Back, Style
import time

class wait_for_toast(object):
    def __init__(self, locator):
        self.locator = locator

    def __call__(self, driver):
        try:
            element_text = EC._find_element(driver, self.locator).text
            return (element_text.startswith('Uh') or element_text.startswith('Feedback'))
        except StaleElementReferenceException:
            return False

try:
    init()
    options = webdriver.ChromeOptions()
    driver = webdriver.Chrome(options=options)
    driver.get("https://vast-oasis-80536.herokuapp.com/index.html")
    driver.maximize_window()
    assert 'TweetData' in driver.title, "Wrong url or web app down"
    print(Fore.GREEN + "Web App opened" + Fore.RESET)
    sent = 0

    #click sign in button, switch to pop up and enter username
    signin = driver.find_element_by_class_name('abcRioButtonContentWrapper')
    signin.click()
    username = "seleniumtesteruftwitter"
    password = "12Pass345%$"
    driver.implicitly_wait(5)
    main_window = driver.window_handles[0]
    pop_up = driver.window_handles[1]
    driver.switch_to.window(pop_up)
    inputBox = driver.find_element_by_tag_name('input')
    inputBox.send_keys(username)

    #click next button
    divs = driver.find_elements_by_tag_name("div")
    for div in divs:
        if div.get_attribute('role') == 'button':
            button = div
            break
    button.click()
    time.sleep(3)

    #enter password, submit and switch to main window
    n_input = driver.find_elements_by_tag_name("input")
    for elem in n_input:
        if elem.get_attribute('type') == 'password':
            textbox = elem
            break
    textbox.send_keys(password)
    button = driver.find_element_by_class_name('CwaK9')
    button.click()
    time.sleep(5)
    driver.switch_to.window(main_window)

    #click hamburger
    driver.implicitly_wait(5)
    divs = driver.find_elements_by_tag_name("div")
    for div in divs:
        if div.get_attribute('role') == 'button':
            #print("Hamburger found")
            div.click()
            break
    driver.implicitly_wait(5)

    #find and click contact link
    elems = driver.find_elements_by_class_name('mdc-list-item')
    for elem in elems:
        if 'contactadmin' in elem.get_attribute('href'):
            #print("contact page found")
            contact = elem
            break     
    contact.click()
    driver.implicitly_wait(3)

    for index in range(1, 12):
        print()
        message = "Preparing e-mail " + str(index) + " of 11"
        print(message)

        #fill out contact admin form and click send
        email = driver.find_element_by_id("inputEmail")
        email.clear()
        email.send_keys("selenium@blah.com")
        name = driver.find_element_by_id("inputName")
        name.clear()
        name.send_keys("Selenium")
        feedback = driver.find_elements_by_tag_name('textarea')
        for elem in feedback:
            message = "Message " + str(index) + " of 11"
            elem.clear()
            elem.send_keys(message)
        button = driver.find_element_by_id("show-toast")
        time.sleep(2)
        button.send_keys(Keys.SPACE)      
        print("Send button clicked")
        WebDriverWait(driver, 10).until(wait_for_toast((By.CLASS_NAME, 'mdl-snackbar__text')))
        toast = driver.find_element_by_class_name("mdl-snackbar__text")
        result = toast.get_attribute("innerText")
        print(Fore.YELLOW + result + Fore.RESET)
        if "Error" in result:
            message = "Failed to send e-mail " + str(index)
            print(Fore.RED + message + Fore.RESET)
        else:
            message = "E-mail " + str(index) + " sent!"
            sent += 1
            print(Fore.GREEN + message + Fore.RESET)
        time.sleep(2)
    


except Exception as E:
    print(E)
    input()

print("\nTest complete")
print(Fore.GREEN + str(sent) + " e-mails sent!" + Fore.RESET)
input()
driver.close()