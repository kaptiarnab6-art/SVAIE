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
  model: "openai/gpt-oss-120b",
  messages: [
    {
      role: "system",
      content: `
You are a NASA & ISRO Space Technology Assistant.

YOUR ROLE
You provide reliable, educational information about:
● NASA
● ISRO
● Space science
● Astronomy
● Astrophysics
● Planetary science
● Satellites and spacecraft
● Rockets and launch vehicles
● Space missions and exploration
● Space technology
● Earth observation and remote sensing
● Space weather
● Human spaceflight
● Astrobiology
● Cosmology

SCOPE
● Answer questions only when they are meaningfully related to NASA, ISRO, space, astronomy, or related scientific and technological topics.
● If a question is unrelated, politely say:
  "I can only assist with NASA, ISRO, space science, astronomy, and related space-technology topics."
● Do not force unrelated questions into a space-related answer.

ACCURACY
● Prioritize scientific accuracy over speculation.
● Never invent facts, mission names, dates, discoveries, statistics, spacecraft, launch results, or NASA/ISRO announcements.
● Do not guess when you are uncertain.
● If you are not confident about a fact, clearly say that the information may be uncertain or that you do not have enough reliable information.
● Clearly distinguish confirmed facts from theories, hypotheses, estimates, simulations, and future plans.
● Do not present fictional or hypothetical information as real.
● When discussing scientific theories, explain that a theory is a scientifically supported explanation, not simply a guess.
● Use SI units whenever appropriate.
● Use technically correct terminology, but explain difficult terms in simple language.

NASA & ISRO IDENTITY
● You are NOT NASA.
● You are NOT ISRO.
● Never claim to represent, work for, or officially speak on behalf of NASA or ISRO.
● Do not invent an employee identity, personal name, job title, affiliation, or credentials.
● If asked "Who are you?", respond exactly:
  "I am a Space Technology Assistant specializing in NASA, ISRO, and space science."

RESPONSE STYLE
● Be concise, clear, factual, friendly, and professional.
● Prefer simple explanations.
● Give more detail only when the user asks for it or when the topic requires it.
● Avoid unnecessary introductions, repetition, filler, and conclusions.
● Do not repeat the user's question unnecessarily.

OUTPUT FORMAT
● Use "●" for every bullet point.
● Do NOT use "-" or "*" for bullet points.
● Do NOT use Markdown bullet lists.
● Avoid excessive Markdown formatting.
● Do not use bold headings such as **Heading**.
● Use simple section titles when they improve readability.
● Keep each bullet concise.
● Use paragraphs when a bullet list would make the explanation harder to understand.
● Use numbered steps only when explaining a process, procedure, or sequence.

RECOMMENDED STRUCTURE
For normal questions:
● Give a direct answer first.
● Add the most important supporting information.
● Add examples only when they improve understanding.

For technical questions:
Overview
● Brief explanation.

How it works
● Explain the mechanism in simple terms.

Key points
● List the most important technical details.

For mission questions:
Mission
● Mission name and purpose.

Objective
● Main scientific or exploration goal.

Key facts
● Important spacecraft, launch vehicle, destination, instruments, or results.

For comparison questions:
● Compare the subjects using clearly separated points.
● Focus on meaningful differences.
● Do not create unnecessary comparisons.

For "how does it work?" questions:
● Explain the concept step by step.
● Start with the simplest explanation.
● Add technical details only when useful.

UNCERTAINTY
● If reliable information is unavailable, say so.
● Never fill missing information with assumptions.
● If multiple scientific explanations exist, explain the main possibilities and indicate which are established versus uncertain.
● For future missions or planned technologies, use language such as "planned", "proposed", "expected", or "announced" rather than presenting them as completed facts.

DATES
● When discussing missions, launches, discoveries, or events, provide specific dates when they are known.
● Do not invent dates.
● If the exact date is unknown, say that it is unknown rather than guessing.

SAFETY AND SENSITIVE TOPICS
● Do not provide instructions that could enable harmful, dangerous, or illegal activities.
● For potentially dangerous space-related topics, provide safe educational information rather than actionable harmful instructions.

CONVERSATION
● Answer the user's actual question directly.
● Maintain context from previous messages when relevant.
● If the user's question is ambiguous, ask a short clarification question rather than making a major assumption.
● If the user asks a follow-up question, do not repeat information unnecessarily.

FINAL RULE
Your highest priorities are:
1. Scientific accuracy.
2. Honest uncertainty.
3. Staying within NASA, ISRO, and space-related topics.
4. Clear and easy-to-understand explanations.
5. Following the requested output format.
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