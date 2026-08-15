import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import {useLocation} from 'react-router-dom'

 import { ToastContainer, toast } from 'react-toastify';

const Centres = () => {

  const loc = useLocation();
  const {data} = loc.state as {data:any[]}

  const [filtered, setFiltered] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const [ , setFavorites] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

  // AI states
  const [aiResponse, setAiResponse] = useState("");
  const [selectedCraft, setSelectedCraft] = useState("");
  const [aiLoading, setAiLoading] = useState(false);


  // Search
  useEffect(()=>{
     const result = data.filter((item) =>
      item.name.toLowerCase().includes(search.trim().toLowerCase()) ||
      item.Place.toLowerCase().includes(search.trim().toLowerCase())
    );
    setFiltered(result);
  },[search])

  // Add to Favorites
  const addToFavorites = (item:any) => {
    const stored = JSON.parse(localStorage.getItem("favorites") ?? "[]");

    const exists = stored.some((fav:any) => fav.id === item.name);

    if (!exists) {
      const newFav = {
        id: item.name,
        name: item.name,
        type: "centre",
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
      const explainCentres = async (name: string) => {
        setAiLoading(true);
        setSelectedCraft(name);
        setAiResponse("");
        setShowModal(true); // open modal instantly

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
You are an ISRO Space Organisation Expert Assistant.

Your primary responsibility is to provide accurate, factual, and historically correct information about ISRO centres, facilities, laboratories, units, and their roles.

STRICT ACCURACY RULES:
● Use only information that is reasonably well-established and reliable.
● Never hallucinate, guess, or invent information.
● Never invent a centre's location, facilities, missions, technologies, achievements, or responsibilities.
● If a specific detail is unknown or cannot be confidently verified, write "Not reliably available" instead of guessing.
● Do not attribute a mission, technology, facility, or achievement to a centre unless there is a clear factual connection.
● Do not confuse ISRO centres with other ISRO units, departments, facilities, launch sites, or partner organisations.
● Do not present assumptions or speculation as facts.
● Prefer official institutional information over generalized descriptions.
● Preserve historically accurate information when describing older or renamed centres.
● Do not fabricate exact dates, statistics, names, or technical specifications.

RESPONSE STRUCTURE:
● Follow the exact output structure requested by the user.
● Do not add extra sections.
● Do not remove any required section.
● Keep each section concise but informative.
● Use the exact field names provided by the user.
● Do not change the order of the fields.
● Do not repeat the same information in multiple sections.

FORMATTING RULES:
● Use the exact emojis shown in the requested format.
● Use "- " only for the four Key Details fields.
● Do not use additional bullet styles.
● Do not use Markdown headings such as # or ##.
● Do not use tables.
● Do not add introductory or concluding text outside the requested structure.
● Keep the response professional and easy to read.
● Use complete, factual sentences.
● Do not place citations, URLs, or unsupported references unless they are explicitly provided by the application.

MISSING INFORMATION:
● If the official name is uncertain, use the most reliable known official name.
● If the location is not reliably known, write "Not reliably available".
● If the primary role is unclear, write "Not reliably available".
● If major facilities are not confidently known, write "Not reliably available".
● If notable contributions cannot be confidently attributed to the centre, write "Not reliably available".
● Never fill missing information with assumptions.

IMPORTANT:
● The user's requested format has priority for presentation.
● Accuracy has priority over completeness.
● It is better to provide "Not reliably available" than an incorrect fact.
● Never claim that information is verified if you cannot confidently establish it.
`
  },
  {
    role: "user",
    content: `
ISRO Centre Name: ${name}

Provide the response in EXACTLY this structure and order:

🏢 Centre Name: <official name>

📌 Purpose: <one concise and factually accurate sentence describing the centre's primary purpose>

🔧 Key Details:
- Location: <city/state if reliably known; otherwise "Not reliably available">
- Primary Role: <engineering / research / launch support / tracking / remote sensing / satellite development / etc.>
- Major Facilities: <only facilities that can be confidently associated with this centre>
- Notable Contributions: <only missions, technologies, systems, or programmes that can be confidently attributed to this centre>

🌍 Importance to India: <one or two concise sentences explaining the centre's significance to India's space programme>

⭐ Fact: <one specific, historically or technically accurate fact about the centre>

STRICT OUTPUT RULES:
● Output ONLY the structure above.
● Do not add an introduction.
● Do not add a conclusion.
● Do not add "Here is the information" or similar text.
● Do not add extra sections.
● Do not change the labels.
● Do not change the order.
● Do not invent missing information.
● Keep the answer concise and professional.
● Every statement must be relevant specifically to the requested ISRO centre.
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
        🏢 ISRO Centres
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
          filtered.map((item, index) => (
            <div className="col-md-4 col-lg-3 mb-3" key={index}>
              <div className="card shadow p-3 h-100 text-center">
                <div style={{ fontSize: "30px" }}>🏢</div>
                <h6 className="mt-2">{item.name}</h6>
                <p className="text-muted mb-0">
                  📍 {item.Place}({item.State})
                </p>

                <button
                  onClick={() => explainCentres(item.name)}
                  className="btn btn-danger btn-sm rounded-circle"
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

                {/*Favorite Button */}
                <button
                  className="btn btn-info btn-sm mt-2"
                  onClick={() => addToFavorites(item)}
                >
                  ⭐ Add to Favorites
                </button>

              </div>
            </div>
          ))
        ) : (
          <div className="text-center mt-4">
            <h5>No centre found 😕</h5>
          </div>
        )}
      </div>

       {/*AI MODAL */}
        {showModal && (
          <div className="ai-overlay" onClick={() => setShowModal(false)}>
            <div
              className="ai-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="ai-header">
                <h5>🧠 AI Centres Explorer</h5>
                <button onClick={() => setShowModal(false)}>✖</button>
              </div>

              <div className="ai-body">
                <h6 className="mb-2">🏢 {selectedCraft}</h6>

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

export default Centres;