document.addEventListener("DOMContentLoaded", function() {
    const chatForm = document.getElementById("chat-form");
    const chatMessages = document.getElementById("chat-messages");
    const sendButton = document.getElementById("send-button");
    sendButton.removeAttribute("disabled");

    chatForm.addEventListener("submit", async function(e) {
        e.preventDefault();
        const userMessage = document.getElementById("user-input").value;
        console.log("User Message:", userMessage);

        // Display user message
        displayMessage("user", userMessage);
        enableSendButton();  // Enable the Send button

        // Send user message to the server
        try {
            const response = await fetch("/chat", {
                method: "POST",
                body: JSON.stringify({ user_input: userMessage }),
                headers: { "Content-Type": "application/json" }
            });
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            const data = await response.json();
            // Display chatbot responses one by one
            data.responses.forEach((response, index) => {
                setTimeout(() => {
                    displayMessage("bot", response);
                    if (index === data.responses.length - 1) {
                        enableSendButton();
                    }
                }, index * 2000);  // Adjust the delay as needed (currently 2 seconds)
            });
        } catch (error) {
            console.error(error);
            // Handle error appropriately
        }

        // Clear user input
        document.getElementById("user-input").value = "";
    });

    function displayMessage(sender, message) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", sender);
        messageElement.innerText = message;
        chatMessages.appendChild(messageElement);

        // Scroll to the bottom of the chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function enableSendButton() {
        sendButton.removeAttribute("disabled");
    }
});