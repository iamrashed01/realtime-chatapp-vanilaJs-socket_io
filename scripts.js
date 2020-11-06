const messageForm = document.getElementById('message_form');
const messageInput = document.getElementById('message_input');
const messageWrapper = document.getElementById('messages');
const messageWrapperMain = document.getElementById('messagesMain');

window.addEventListener('load', () => {
  messageInput.focus();
})

messageForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = messageInput.value;
  sentMessage(message)
  messageInput.value = '';
  messageWrapperMain.scrollTo(0, messageWrapper.clientHeight);
})

function appendMessage(msg) {
  const messageElement = document.createElement('div');
  messageElement.innerText = msg;
  messageElement.classList.add('client_msg');
  messageWrapper.append(messageElement);
}

function sentMessage(msg) {
  const messageElement = document.createElement('div');
  messageElement.innerText = msg;
  messageElement.classList.add('my_msg');
  messageWrapper.append(messageElement);
}