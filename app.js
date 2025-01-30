// Firebase Configuration (Replace with yours)
const firebaseConfig = {
    apiKey: "AIzaSyB4g2voerd6IwZ1KhvSpX6q9jsT3nOb7Bg",
    authDomain: "chat-app-f338e.firebaseapp.com",
    projectId: "chat-app-f338e",
    storageBucket: "chat-app-f338e.firebasestorage.app",
    messagingSenderId: "245595319848",
    appId: "1:245595319848:web:5ed7df067634216f694f1d"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// DOM Elements
const authContainer = document.getElementById('auth-container');
const chatContainer = document.getElementById('chat-container');

// Auth Functions
async function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        await auth.signInWithEmailAndPassword(email, password);
        showChat();
    } catch (error) {
        alert(error.message);
    }
}

async function handleRegister() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const username = document.getElementById('username').value;

    try {
        const userCred = await auth.createUserWithEmailAndPassword(email, password);
        await db.collection('users').doc(userCred.user.uid).set({
            username: username,
            friends: [],
            requests: []
        });
        showChat();
    } catch (error) {
        alert(error.message);
    }
}

function logout() {
    auth.signOut();
    authContainer.style.display = 'flex';
    chatContainer.style.display = 'none';
}

// Friend System
async function sendFriendRequest() {
    const friendUsername = document.getElementById('friend-username').value;
    const currentUser = auth.currentUser;

    const users = await db.collection('users')
        .where('username', '==', friendUsername)
        .get();

    if (!users.empty) {
        const friend = users.docs[0];
        await db.collection('users').doc(friend.id).update({
            requests: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)
        });
        alert('Friend request sent!');
    } else {
        alert('User not found');
    }
}

// Chat Functions
function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
    
    if (message) {
        addMessage(message, 'sent');
        messageInput.value = '';
        // Add Firebase message saving here
    }
}

function addMessage(text, type) {
    const messagesDiv = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Auth State Listener
auth.onAuthStateChanged(user => {
    if (user) {
        showChat();
    } else {
        authContainer.style.display = 'flex';
        chatContainer.style.display = 'none';
    }
});

function showChat() {
    authContainer.style.display = 'none';
    chatContainer.style.display = 'flex';
}
