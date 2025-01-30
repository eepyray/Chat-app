// Get elements from HTML
const messageInput = document.getElementById('message-input');
const chatMessages = document.getElementById('chat-messages');
const sendBtn = document.getElementById('send-btn');

// Send message when button is clicked
sendBtn.addEventListener('click', sendMessage);

// Send message when Enter key is pressed
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = messageInput.value.trim();
    
    if (message) {
        // Create sent message
        createMessage(message, 'sent');
        
        // Simulate received message (replace this with actual functionality)
        setTimeout(() => {
            createMessage(`Echo: ${message}`, 'received');
        }, 1000);

        // Clear input
        messageInput.value = '';
    }
}

function createMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', type);
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}