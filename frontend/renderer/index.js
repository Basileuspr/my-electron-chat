document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const output = document.getElementById('chat-output');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const message = input.value.trim();
    if (!message) return;

    const messageEl = document.createElement('div');
    messageEl.textContent = `You: ${message}`;
    output.appendChild(messageEl);

    input.value = '';
  });
});
window.addEventListener('DOMContentLoaded', () => {
  // Step 1: Make a GET request to the backend server's /api/message endpoint
  fetch('http://localhost:3000/api/message')
    .then(res => res.json()) // Step 2: Parse the JSON response
    .then(data => {
      // Step 3: Create a new <p> element
      const messageEl = document.createElement('p');
      // Step 4: Set its text content to what we got from the server
      messageEl.textContent = data.message;
      // Step 5: Append the <p> element to the body of the HTML
      document.body.appendChild(messageEl);
    })
    .catch(err => {
      // Step 6: Handle any errors (e.g., backend is not running)
      console.error('Error fetching from backend:', err);
    });
});
