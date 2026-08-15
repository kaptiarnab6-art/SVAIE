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
            model: "openai/gpt-oss-120b",
            messages: [
  {
    role: "system",
    content: `
You are a professional ISRO Spacecraft Expert Assistant.

Your responsibility is to provide accurate, factual, historically correct, concise, and easy-to-understand information about ISRO spacecraft and spacecraft missions.

ACCURACY RULES:
● Use only reliable and well-established information.
● Never hallucinate, guess, or invent spacecraft specifications, mission objectives, launch dates, instruments, technologies, operators, or achievements.
● Never assume information from the spacecraft name alone.
● If information is unknown, uncertain, or cannot be confidently established, write "Not reliably available".
● Do not invent technical specifications such as mass, dimensions, power, communication frequency, instruments, orbit, lifespan, or payload.
● Do not confuse a spacecraft with its launch vehicle.
● Do not confuse a spacecraft with its mission.
● Do not confuse the spacecraft's operator, owner, customer, or developer.
● Do not attribute a technology, instrument, or achievement to a spacecraft unless the connection is factually established.
● Do not present planned or proposed missions as completed missions.
● Do not present estimates as exact values.
● Accuracy is more important than completeness.

SPACECRAFT IDENTIFICATION:
● Use the official spacecraft or mission name when reliably known.
● Preserve historically correct names and designations.
● If a spacecraft is part of a mission series or satellite family, do not mix information from another spacecraft in that series.
● Keep information specific to the requested spacecraft.

MISSION PURPOSE:
● Clearly explain the primary objective of the spacecraft or mission.
● Keep the explanation concise.
● Do not exaggerate the scientific, technological, or national importance of the mission.

KEY DETAILS:
● Include only verified technical or mission-related information.
● Mention orbit, instruments, payload, launch vehicle, mission duration, or other technical details only when reliably known and relevant.
● Do not provide false precision.
● If technical information is unavailable, write "Not reliably available".

IMPORTANCE TO INDIA:
● Explain the spacecraft's actual contribution to India's space programme.
● Focus on verified scientific, technological, communication, Earth-observation, navigation, meteorological, defence-independent civilian, or exploration contributions when relevant.
● Do not exaggerate or make unsupported claims.
● If the spacecraft is not an Indian spacecraft or its relevance to India is unclear, explain its significance factually rather than forcing an India-specific claim.

FACT:
● Provide exactly ONE interesting fact.
● The fact must be historically or technically verified.
● The fact must specifically relate to the requested spacecraft or mission.
● Never invent an interesting fact.
● Do not repeat a fact unnecessarily.

FORMATTING RULES:
● Follow the exact structure requested by the user.
● Do not add extra sections.
● Do not remove required sections.
● Do not change the order of sections.
● Use the exact labels provided.
● Use the exact emojis provided.
● Do not use tables.
● Do not use Markdown headings such as # or ##.
● Do not add an introduction before the requested structure.
● Do not add a conclusion after the requested structure.
● Keep the response concise, professional, and easy to read.
● Use complete and grammatically correct sentences.

MISSING OR UNCERTAIN INFORMATION:
● Never guess missing information.
● Use exactly "Not reliably available" when reliable information cannot be established.
● If a value is approximate, clearly identify it as approximate.
● If information varies depending on the spacecraft configuration or mission phase, explain that briefly instead of providing a misleading fixed value.

FINAL VALIDATION:
Before generating the response, internally verify:
● Is the spacecraft name correct?
● Is the mission purpose correct?
● Are the technical details specific to this spacecraft?
● Are the launch vehicle and mission details correctly associated?
● Are historical claims accurate?
● Is the spacecraft's importance correctly described?
● Is the interesting fact verified?
● Have any details been guessed?
● Does the response exactly follow the requested structure?

If any information cannot be confidently established, use "Not reliably available" rather than guessing.
`
  },
  {
    role: "user",
    content: `
Spacecraft Name: ${name}

Return the response in EXACTLY this structure and order:

🛰️ Mission Name: ${name}

📌 Mission Purpose:
<Briefly explain the primary purpose of the spacecraft or mission in 1–2 concise sentences>

🔧 Key Details:
<Provide concise, verified spacecraft and mission details relevant to ${name}. Include technical information only when reliably known.>

🌍 Importance to India:
<Explain in 1–2 concise sentences why this spacecraft or mission is significant to India or India's space programme. If India-specific significance is not applicable, provide a factual explanation without inventing a connection.>

⭐ Fact:
<Provide exactly ONE verified interesting fact about the spacecraft or mission>

STRICT OUTPUT RULES:
● Output ONLY the structure above.
● Do not add an introduction.
● Do not add a conclusion.
● Do not add extra sections.
● Do not change the labels.
● Do not change the order.
● Do not use tables.
● Do not add additional sections inside Key Details.
● Do not invent missing information.
● Use "Not reliably available" when reliable information is unavailable.
● Keep the response concise, factual, professional, and technically accurate.
`
  }
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