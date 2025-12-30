from playwright.sync_api import sync_playwright

def verify_chat_widget():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the local server
        page.goto("http://localhost:8080/index.html")

        # 1. Verify toggle button exists and click it
        toggle_btn = page.locator("#chatToggle")
        if not toggle_btn.is_visible():
            print("Toggle button not visible")
            return

        toggle_btn.click()

        # 2. Wait for chat window to open
        page.wait_for_timeout(500) # Wait for transition

        # 3. Take screenshot of opened chat
        page.screenshot(path="verification/chat_open.png")
        print("Screenshot saved to verification/chat_open.png")

        # 4. Interact: Type "Hola"
        chat_input = page.locator("#chatInput")
        chat_input.fill("Hola")
        page.locator("#sendMessage").click()

        # 5. Wait for bot response
        # The initial greeting is also .message.bot, so we should check for a new one or just wait
        page.wait_for_timeout(2000)

        # 6. Take screenshot of conversation
        page.screenshot(path="verification/chat_conversation.png")
        print("Screenshot saved to verification/chat_conversation.png")

        browser.close()

if __name__ == "__main__":
    verify_chat_widget()
