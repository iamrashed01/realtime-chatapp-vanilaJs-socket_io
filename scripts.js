const socket = io('http://localhost:3000');
const messageForm = document.getElementById('message_form');
const messageInput = document.getElementById('message_input');
const messageWrapper = document.getElementById('messages');
const messageWrapperMain = document.getElementById('messagesMain');

messageInput.focus();
const name = prompt('What is your name?')
if (!name || name === '') {
  userNotification('Connection Failed(Name Required) | Reload your browser!')
} else {
  sentMessage('You joined!')
  socket.emit('new-user', name);
}

socket.on('user-connected', name => {
  userNotification(name)
})

socket.on('chat-message', data => {
  appendMessage(data)
})

socket.on('disconnection', name => {
  userNotification(name + ' Disconnected')
})

messageForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = messageInput.value;
  socket.emit('sent-message', message);
  sentMessage(message)
  messageInput.value = '';
  messageWrapperMain.scrollTo(0, messageWrapper.clientHeight);
})

function appendMessage(data) {
  const messageElement = document.createElement('div');
  const clientName = document.createElement('span');
  messageElement.innerText = data.message;
  messageElement.classList.add('client_msg');
  clientName.innerText = data.name;
  messageElement.prepend(clientName);
  messageWrapper.append(messageElement);
  messageWrapperMain.scrollTo(0, messageWrapper.clientHeight);
}

function sentMessage(msg) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('my_msg');
  messageElement.innerText = msg;
  messageWrapper.append(messageElement);
}

function userNotification(msg) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('user_disconnected');
  messageElement.innerText = msg;
  messageWrapper.append(messageElement);
}