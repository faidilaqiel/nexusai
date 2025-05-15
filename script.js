async function sendMessage() {
  const input = document.getElementById("userInput");
  const chatbox = document.getElementById("chatbox");

  const userMessage = input.value.trim();
  if (!userMessage) return;

  chatbox.innerHTML += `<p><strong>Anda:</strong> ${userMessage}</p>`;
  input.value = "";

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });
    const data = await response.json();

    if (data.reply) {
      chatbox.innerHTML += `<p><strong>Nexus:</strong> ${data.reply}</p>`;
    } else {
      chatbox.innerHTML += `<p><strong>Nexus:</strong> Terjadi kesalahan.</p>`;
    }
  } catch (err) {
    chatbox.innerHTML += `<p><strong>Nexus:</strong> Gagal menghubungi server.</p>`;
  }

  chatbox.scrollTop = chatbox.scrollHeight;
}

function startChat() {
  document.getElementById("userInput").focus();
}
