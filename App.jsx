import React, { useState } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendPrompt = async () => {
    if (!prompt.trim()) {
      setResponse("Please enter a prompt");
      return;
    }

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("http://localhost:8080/api/gemini/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: prompt
        })
      });

      if (!res.ok) {
        throw new Error("Server error: " + res.status);
      }

      const data = await res.text();
      setResponse(data);
    } catch (error) {
      setResponse("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Chatbot-Gemini </h2>

        <textarea
          style={styles.textarea}
          placeholder="Enter your prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button style={styles.button} onClick={sendPrompt}>
          {loading ? "Generating..." : "Generate"}
        </button>

        <div style={styles.response}>
          {response}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: "#f4f6f8",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    width: "500px",
    background: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  },
  textarea: {
    width: "100%",
    height: "90px",
    padding: "10px",
    fontSize: "14px"
  },
  button: {
    marginTop: "10px",
    width: "100%",
    padding: "10px",
    background: "#2563eb",
    color: "#ffffff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  response: {
    marginTop: "15px",
    background: "#f1f5f9",
    padding: "10px",
    minHeight: "60px",
    whiteSpace: "pre-wrap"
  }
};

export default App;
