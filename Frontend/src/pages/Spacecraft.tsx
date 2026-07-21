import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";

import { ToastContainer, toast } from 'react-toastify';
import { useLocation } from "react-router-dom";

const Spacecraft = () => {

  const loc = useLocation();
  const {data} = loc.state as {data:any[]}
  
  const [filtered, setFiltered] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const [ , setFavorites] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

  // AI states
  const [aiResponse, setAiResponse] = useState<string>("");
  const [selectedCraft, setSelectedCraft] = useState<string>("");
  const [aiLoading, setAiLoading] = useState<boolean>(false);

  // Search
  useEffect(()=>{
     const result = data.filter((item) =>
      item.name.toLowerCase().includes(search.trim().toLowerCase())
    );
    setFiltered(result);
  },[search])


  // Favorites
  const addToFavorites = (item: any) => {
    const stored = JSON.parse(localStorage.getItem("favorites") ?? "[]");

    const exists = stored.some((fav: any) => fav.name === item.name);

    if (!exists) {
      const newFav = {
        id: item.name,
        name: item.name,
        type: "spacecraft",
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
      const explainSpacecraft = async (name: string) => {
      setAiLoading(true);
      setSelectedCraft(name);
      setAiResponse("");
      setShowModal(true); // 👈 open modal instantly

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
                  "You are an ISRO space expert assistant. Explain spacecraft in structured format.",
              },
              {
                role: "user",
                content: `
                  Spacecraft Name: ${name}

                  Return in this format:

                  🛰️ Mission Name: ${name}
                  📌 Mission Purpose:
                  🔧 Key Details:
                  🌍 Importance to India:
                  ⭐ Fact:
                  `,
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

        setAiResponse(res.data?.choices?.[0]?.message?.content || "No response");
      } catch (err) {
        console.log(err);
        setAiResponse("Error fetching AI response 😢");
      }

      setAiLoading(false);
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
      {/* TITLE */}
      <h2 className="text-center fw-bold mb-3">
        🛰️ ISRO Spacecrafts
      </h2>

      {/* Search */}
      <div className="sticky-top bg-white py-2 bg-transparent"  style={{top: "38px", zIndex: 10}}>
        <SearchBar
          value={search}
          onChange={setSearch}
        />
      </div>

      {/* CARDS */}
      <div className="row">
        {filtered.length > 0 ? (
          filtered.map((item, index) => (
            <div className="col-md-4 col-lg-3 mb-3" key={index}>
              <div className="card shadow p-3 h-100 text-center position-relative">

                <div style={{ fontSize: "30px" }}>🛰️</div>

                <h6 className="mt-2">{item.name}</h6>

              <button
                  onClick={() => explainSpacecraft(item.name)}
                  className="btn btn-primary btn-sm rounded-circle"
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

                <br />

                {/*FAVORITES */}
                <button
                  className="btn btn-success btn-sm mt-2"
                  onClick={() => addToFavorites(item)}
                >
                  ⭐ Add to Favorites
                </button>

              </div>
            </div>
          ))
        ) : (
          <div className="text-center mt-4">
            <h5>No spacecraft found 😕</h5>
          </div>
        )}
      </div>

      {/* AI MODAL */}
        {showModal && (
          <div className="ai-overlay" onClick={() => setShowModal(false)}>
            <div
              className="ai-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="ai-header">
                <h5>🧠 AI Spacecraft Explorer</h5>
                <button onClick={() => setShowModal(false)}>✖</button>
              </div>

              <div className="ai-body">
                <h6 className="mb-2">🛰️ {selectedCraft}</h6>

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

export default Spacecraft;