import { useState, useRef, useEffect } from "react";
import axios from "axios";

const GroqChatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

  const chatRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const currentInput = input;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: currentInput },
    ]);

    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
  model: "llama-3.3-70b-versatile",
  messages: [
    {
      role: "system",
      content: `
       You are a NASA & ISRO Space Technology Assistant.

      Role:
      - Answer only questions related to NASA, ISRO, space science, astronomy, astrophysics, satellites, rockets, space exploration, planetary science, and space technology.
      - If a question is outside these topics, politely inform the user that you can only assist with NASA, ISRO, and space-related subjects.

      Response Style:
      - Be accurate, factual, and technically reliable.
      - Keep answers short, clear, and easy to understand unless the user requests detailed information.
      - Use a structured format with bullet points.
      - Always use "●" for bullet points instead of markdown bullets or bold headings.
      - Explain complex concepts in simple language.
      - Maintain a friendly, professional, and helpful tone.
      - Avoid unnecessary repetition or filler.

      Formatting:
      ● Start with a brief introduction when appropriate.
      ● Organize information into logical sections.
      ● Use concise bullet points.
      ● Include examples only when they improve understanding.
      ● End with a short summary for longer answers.

      Identity:
      - Do not claim to be NASA or ISRO.
      - Do not invent a personal name.
      - If asked who you are, respond:
        "I am a Space Technology Assistant specializing in NASA, ISRO, and space science."

      Guidelines:
      - Prioritize scientific accuracy over speculation.
      - Clearly distinguish facts from theories or future concepts.
      - If information is uncertain or unavailable, state that honestly.
      - Use SI units where applicable.
      - Avoid answering unrelated topics.
    `
    },
    {
      role: "user",
      content: currentInput
    }
  ],
  temperature: 0.3
},
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const botReply =
        res.data?.choices?.[0]?.message?.content ||
        "No response received";

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: botReply },
      ]);
    } catch (err) {
      console.log(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "❌ Error fetching response from Groq",
        },
      ]);
    }

    setLoading(false);
  };

  return (
   <div
  className="container py-3 d-flex justify-content-center"
  style={{ maxHeight: "93vh", background: "#f5f7fb" }}
>
  <div
    className="card shadow-lg border-0"
    style={{
      width: "100%",
      maxWidth: "900px",
      borderRadius: "20px",
      overflow: "hidden",
    }}
  >
    {/* Header */}
    <div
      className="d-flex align-items-center justify-content-between px-4 py-3"
      style={{
        background: "linear-gradient(135deg,#0d6efd,#6f42c1)",
        color: "#fff",
      }}
    >
      <div className="d-flex align-items-center">
        <div
          className="rounded-circle bg-white text-primary d-flex justify-content-center align-items-center me-3"
          style={{
            width: "50px",
            height: "50px",
            fontSize: "24px",
          }}
        >
          🚀
        </div>

        <div>
          <h5 className="mb-0 fw-bold">Space AI Assistant</h5>
          <small className="opacity-75">
            Ask anything about NASA, ISRO & Space
          </small>
        </div>
      </div>

      <span className="badge bg-success px-3 py-2">
        ● AI Chat
      </span>
    </div>

    {/* Chat */}
    <div
      ref={chatRef}
      className="p-4"
      style={{
        height: "500px",
        overflowY: "auto",
        background: "#eef2f7",
      }}
    >
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`d-flex mb-3 ${
            msg.role === "user"
              ? "justify-content-end"
              : "justify-content-start"
          }`}
        >
          {msg.role !== "user" && (
            <div
              className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center me-2 flex-shrink-0"
              style={{
                width: "40px",
                height: "40px",
              }}
            >
              🤖
            </div>
          )}

          <div
            className={`p-3 shadow-sm ${
              msg.role === "user"
                ? "bg-primary text-white"
                : "bg-white"
            }`}
            style={{
              maxWidth: "75%",
              borderRadius: "18px",
              whiteSpace: "pre-line",
              fontSize: "15px",
              lineHeight: "1.6",
            }}
          >
            {msg.text}
          </div>

          {msg.role === "user" && (
            <div
              className="rounded-circle bg-dark text-white d-flex justify-content-center align-items-center ms-2 flex-shrink-0"
              style={{
                width: "40px",
                height: "40px",
              }}
            >
              👤
            </div>
          )}
        </div>
      ))}

      {loading && (
        <div className="d-flex align-items-center">
          <div
            className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center me-2"
            style={{
              width: "40px",
              height: "40px",
            }}
          >
            🤖
          </div>

          <div
            className="bg-white shadow-sm px-3 py-2"
            style={{
              borderRadius: "15px",
            }}
          >
            <span
              className="spinner-border spinner-border-sm text-primary me-2"
              role="status"
            ></span>

            Thinking...
          </div>
        </div>
      )}
    </div>

    {/* Input */}
    <div className="border-top bg-white p-3">
      <div className="input-group">
        <input
          type="text"
          className="form-control border-0 shadow-sm"
          style={{
            borderRadius: "15px 0 0 15px",
            height: "55px",
          }}
          placeholder="Ask anything about space..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && sendMessage()
          }
        />

        <button
          className="btn btn-primary px-4"
          style={{
            borderRadius: "0 15px 15px 0",
          }}
          onClick={sendMessage}
        >
          <i className="bi bi-send-fill me-2"></i>
          Send
        </button>
      </div>
    </div>
  </div>
</div>
  );
};

export default GroqChatbot;