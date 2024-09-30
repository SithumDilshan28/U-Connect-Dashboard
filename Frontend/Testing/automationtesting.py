from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Set up the WebDriver path
driver_path = r'E:\Academics\ICBT\BSC\5) Software Engineering Dissertation Project\New Project Plan\Final Project Documentation\Application\Dashboard\Frontend\Testing\chromedriver.exe'
service = Service(driver_path)

# Set Chrome options
chrome_options = Options()
chrome_options.add_argument("--start-maximized")  # Open browser maximized

# Initialize the WebDriver
print("Starting Chrome browser...")
driver = webdriver.Chrome(service=service, options=chrome_options)

# Step 1: Open your MERN website login page
print("Opening the login page...")
driver.get('http://localhost:5173/auth/login')

# Step 2: Wait for the email and password fields to be present
print("Waiting for the email and password fields to be present...")

try:
    # Wait until the email input is present
    email_field = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "email"))
    )

    # Find the password field
    password_field = driver.find_element(By.ID, 'password')

    # Step 3: Enter credentials
    print("Entering credentials...")
    email_field.send_keys("admin@gmail.com")
    password_field.send_keys("1234")

    # Step 4: Locate the login button and click it
    print("Clicking the login button...")
    login_button = driver.find_element(By.CSS_SELECTOR, 'button[type="submit"]')
    login_button.click()

    # Step 5: Wait for login response
    time.sleep(3)

    # Check if the URL has changed
    current_url = driver.current_url
    print(f"Current URL: {current_url}")

    # Step 6: Check for a success message or presence of a post-login element
    try:
        # Wait for Swal toast or specific element indicating login success
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "swal2-toast-shown"))  # Check for SweetAlert success
        )
        print("Login successful!")
    except Exception:
        print("No success message found, checking URL...")
        if current_url == 'http://localhost:5173/':  # Adjust if necessary based on expected URL
            print("Login successful based on URL!")
        else:
            print("Login failed! The login form might have been submitted incorrectly or there was an issue.")

except Exception as e:
    print(f"An error occurred: {e}")

finally:
    # Step 7: Close the browser
    print("Closing the browser...")
    driver.quit()
