// A simple rule‑based chatbot for MyNatureCheck.
// In a production app you might replace this with a server call to an AI model.

// Predefined answers for common questions.
const RESPONSES = {
  "what is my nature check?":
    "My Nature Check is your personal guide to the natural world around you. We help you explore, identify, and learn about flora and fauna.",
  "how can i identify a plant?":
    "You can use our image recognition feature to upload a picture of the plant, and we'll do our best to identify it for you.",
  "tell me about the importance of biodiversity.":
    "Biodiversity is crucial for ecosystem health, providing us with resources, regulating climate, and inspiring countless innovations.",
  "hello":
    "Hello! How can I help you explore nature today?",
  "hi":
    "Hi there! Ask me anything about My Nature Check or the natural world.",
  "help":
    "Try asking me about parks, trails, or how to identify plants. I'm here to assist!",
};

/**
 * Generates a bot response based on the user's input.
 * If no predefined response matches, returns a fallback message.
 * @param {string} input
 * @returns {string}
 */
function getBotResponse(input) {
  const key = input.trim().toLowerCase();
  return RESPONSES[key] ||
    "I'm sorry, I don't have an answer for that yet. Try asking something else about nature or My Nature Check.";
}

// Set up chatbot UI interactions once the DOM is ready.
window.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("chat-toggle");
  const chatContainer = document.getElementById("chat-container");
  const messagesDiv = document.getElementById("chat-messages");
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");

  // Toggle chat visibility
  toggleBtn.addEventListener("click", () => {
    chatContainer.classList.toggle("hidden");
    if (!chatContainer.classList.contains("hidden")) {
      chatInput.focus();
    }
  });

  // Handle form submission
  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const userText = chatInput.value.trim();
    if (!userText) return;
    appendMessage(userText, "user");
    chatInput.value = "";
    // Generate bot response after a short delay
    setTimeout(() => {
      const botReply = getBotResponse(userText);
      appendMessage(botReply, "bot");
    }, 300);
  });

  /**
   * Appends a message to the chat panel.
   * @param {string} text
   * @param {"user"|"bot"} sender
   */
  function appendMessage(text, sender) {
    const msg = document.createElement("div");
    msg.className = `chat-message ${sender}`;
    msg.textContent = text;
    messagesDiv.appendChild(msg);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
});
