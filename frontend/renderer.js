async function sendMessageToBackend(message) {
  try {
    const response = await fetch('http://localhost:3000/api/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    console.log("Backend Response:", data.message);
    // You can display this in your frontend UI instead of console.log
  } catch (error) {
    console.error("Error talking to backend:", error);
  }
}
