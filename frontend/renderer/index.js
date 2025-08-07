function logFrontend(message) {
  console.log(`[Frontend Log @ ${new Date().toLocaleTimeString()}] ${message}`);
}

document.getElementById('send-button').addEventListener('click', () => {
  const input = document.getElementById('message-input').value;
  logFrontend(`User input: "${input}"`);

  fetch('http://localhost:3000/api/message', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: input })
  })
  .then(res => res.json())
  .then(data => {
    logFrontend(`Backend replied: "${data.message}"`);
    const chat = document.getElementById('chat-history');
    const messageElem = document.createElement('div');
    messageElem.textContent = data.message;
    chat.appendChild(messageElem);
  })
  .catch(err => {
    logFrontend(`❌ Error: ${err.message}`);
  });
});
