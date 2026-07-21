import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import {useLocation} from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';

const Customers = () => {

  const loc = useLocation();
  const {data} = loc.state as {data:any[]}

  const [filtered, setFiltered] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const [favorites, setFavorites] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

  // AI states
  const [aiResponse, setAiResponse] = useState("");
  const [selectedCraft, setSelectedCraft] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  // Search
  useEffect(()=>{
     const result = data.filter((item) =>
      item.id.toLowerCase().includes(search.trim().toLowerCase()) ||
      item.country.toLowerCase().includes(search.trim().toLowerCase()) ||
      item.launcher.toLowerCase().includes(search.trim().toLowerCase()) 
    );
    setFiltered(result);
  },[search])

  // Add to Favorites
  const addToFavorites = (item: any) => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");

    const exists = stored.some((fav: any) => fav.id === item.id);

    if (!exists) {
      const newFav = {
        id: item.id,
        name: item.id,
        type: "customer",
      };

      const updated = [...stored, newFav];

      localStorage.setItem("favorites", JSON.stringify(updated));
      setFavorites(updated);

      toast("Added to favorites ⭐");
    } else {
      toast("Already in favorites ❤️");
    }
  };

  // Groq AI Explain Feature
      const explainCustomers = async (name: string) => {
        setAiLoading(true);
        setSelectedCraft(name);
        setAiResponse("");
        setShowModal(true); // open modal instantly

        const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

        try {
          const res = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
              model: "llama-3.3-70b-versatile",
              messages: [
                {
                  role: "system",
                  content:
                    "You are an ISRO satellite expert. Provide accurate, historically correct, concise, and well-structured information about ISRO customer satellites. Do NOT hallucinate or invent specifications, mission details, launch dates, or operators. If any information is uncertain or not publicly verified, write 'Not confirmed'."
                },
                {
                  role: "user",
                  content: `
                Customer Satellite Name: ${name}

                Provide the response in this STRICT format:

                📡 Satellite Name: <official name>

                📌 Mission Purpose:
                <Briefly explain the satellite's primary objective.>

                🔧 Key Details:
                - Customer/Country:
                - Satellite Type:
                - Launch Vehicle:
                - Launch Date:
                - Orbit:
                - Notable Technical Facts:

                🌍 Importance:
                <Explain why this satellite or mission was significant for ISRO and/or the customer country.>

                ⭐ Fact:
                <Provide one verified interesting fact only. If unavailable, write "Not confirmed".>

                Rules:
                - Use only verified information.
                - Never guess missing values.
                - If a field is unknown, write "Not confirmed".
                - Keep the response concise and factual.
                `
                },
              ],
              temperature: 0.3,
            },
            {
              headers: {
                Authorization: `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
              },
            }
          );

          const content =
            res.data?.choices?.[0]?.message?.content?.trim() ||
            "No response received";

          setAiResponse(content);
        } catch (err) {
          console.error("AI Error:", err);
          setAiResponse("Error fetching AI response 😢");
        } finally {
          setAiLoading(false);
        }
      };

  return (
    <div className="container mt-4">

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      {/* Title */}
      <h2 className="text-center fw-bold mb-3">
        📡 Customer Satellites
      </h2>

      {/* Search */}
      <div className="sticky-top bg-white py-2 bg-transparent"  style={{top: "38px", zIndex: 10}}>
        <SearchBar
          value={search}
          onChange={setSearch}
        />
      </div>

      {/* Cards */}
      <div className="row">
        {filtered.length > 0 ? (
          filtered.map((item: any, index: number) => (
            <div className="col-md-4 col-lg-3 mb-3" key={index}>
          <div className="card shadow p-3 h-100 text-center position-relative">

            {/*AI Button (Top Right Corner) */}
            <button
                  onClick={() => explainCustomers(item.id)}
                  className="btn btn-info btn-sm rounded-circle"
                  title="Ask AI"
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    width: "38px",
                    height: "38px",
                    padding: "0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  }}
                >
                  🤖
              </button>
            <div style={{ fontSize: "30px" }}>📡</div>
            <h6 className="mt-2">ID: {item.id}</h6>
            <p className="text-muted mb-1">🌍 {item.country}</p>
            <small className="text-muted">🚀 {item.launcher}</small>
            <small className="text-muted">
              📆 {" "}
              {item.launch_date
                ? (() => {
                    const [day, month, year] = item.launch_date.split("-");

                    return `${day}/${month}/${year}`;
                  })()
                : "N/A"}
            </small>

            {/*Favorite Button */}
            <button
              className="btn btn-primary btn-sm mt-2"
              onClick={() => addToFavorites(item)}
            >
              ⭐ Add to Favorites
            </button>

          </div>
        </div>
          ))
        ) : (
          <div className="text-center mt-4">
            <h5>No satellites found 😕</h5>
          </div>
        )}
      </div>

       {/* 🧠 AI MODAL */}
        {showModal && (
          <div className="ai-overlay" onClick={() => setShowModal(false)}>
            <div
              className="ai-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="ai-header">
                <h5>🧠 AI Satellites Explorer</h5>
                <button onClick={() => setShowModal(false)}>✖</button>
              </div>

              <div className="ai-body">
                <h6 className="mb-2">📡 {selectedCraft}</h6>

                {aiLoading ? (
                  <div className="ai-loading">
                    🤖 Thinking like ISRO scientist...
                  </div>
                ) : (
                  <pre className="ai-text">{aiResponse}</pre>
                )}
              </div>
            </div>
          </div>
        )}

    </div>
  );
};

export default Customers;