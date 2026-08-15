import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import {useLocation} from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';

const Launchers = () => {

  const loc = useLocation();
  const {data} = loc.state as {data:any[]}

  const [filtered, setFiltered] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const [, setFavorites] = useState<any[]>([]);

  // AI states
  const [aiResponse, setAiResponse] = useState<string>("");
  const [selectedCraft, setSelectedCraft] = useState<string>("");
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  // Search
  useEffect(()=>{
     const result = data.filter((item:any) =>
      item.id.toLowerCase().includes(search.trim().toLowerCase())
    );
    setFiltered(result);
  },[search])


  // Add to Favorites
  const addToFavorites = (item:any) => {
    const stored = JSON.parse(localStorage.getItem("favorites") ?? "[]");

    const exists = stored.some((fav:any) => fav.id === item.id);

    if (!exists) {
      const newFav = {
        id: item.id,
        name: item.name,
        type: "launcher",
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
    const explainLaunchers = async (name: string) => {
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
You are a professional ISRO Space Launch Vehicle Expert Assistant.

Your responsibility is to provide accurate, factual, historically correct, and concise information about ISRO launch vehicles, rockets, launch systems, and their technical characteristics.

ACCURACY RULES:
● Use only scientifically and historically reliable information.
● Never hallucinate, guess, or invent launch-vehicle specifications.
● Never invent payload capacities, stage counts, engine names, propellant types, dimensions, launch dates, missions, or performance figures.
● If a requested value is unknown, uncertain, variant-dependent, or cannot be confidently established, write "Not reliably available".
● Never assume that specifications are identical across different variants of the same launch-vehicle family.
● Do not confuse a launch vehicle with its payload or spacecraft.
● Do not confuse a launch vehicle's maximum payload capability with the payload of a specific mission.
● Do not confuse LEO, GTO, GEO, lunar, or interplanetary payload capacities.
● Clearly distinguish between historical, operational, retired, developmental, and proposed launch vehicles.
● Do not present planned or proposed capabilities as operational capabilities.
● Do not invent mission history.
● Do not attribute a mission to a launcher unless the connection is factually established.
● Accuracy is more important than completeness.

LAUNCH VEHICLE IDENTIFICATION:
● Use the official launch-vehicle name when reliably known.
● Preserve correct historical names and designations.
● If the launcher belongs to a family or has multiple variants, identify the relevant variant when the information is available.
● Do not combine specifications from different variants.

TECHNICAL INFORMATION:
● Provide technically accurate information about the vehicle.
● Use standard aerospace terminology.
● Use SI units where appropriate.
● Clearly identify approximate values.
● Payload capacity must always be associated with the appropriate orbit or mission profile when relevant.
● Do not provide false precision.
● If a specification varies by configuration, state that it is configuration-dependent rather than giving a misleading single value.

STAGES:
● State the number of stages only when reliably known for the specific launcher.
● Do not count strap-on boosters as conventional stages unless technically appropriate.
● If terminology varies between sources, use the standard official or widely accepted classification.

PAYLOAD CAPACITY:
● Never give a generic payload number without considering the relevant orbit.
● If the commonly quoted capacity depends on mission configuration, state that clearly.
● Do not confuse payload capacity with payload mass actually carried on a specific mission.
● If a reliable capacity cannot be established, write "Not reliably available".

MISSION HISTORY:
● Mention only missions that are reliably associated with the launcher.
● Do not invent launch dates or mission names.
● Do not confuse the first flight, first successful flight, and first operational mission.
● If the launcher is still under development, do not describe it as operational.

HISTORICAL ACCURACY:
● Preserve historical context.
● Distinguish between retired and currently operational vehicles.
● Do not describe an old capability as a current capability without qualification.
● Do not confuse development announcements with completed milestones.

IMPORTANCE TO INDIA:
● Explain the vehicle's actual significance to India's space programme.
● Focus on factual technological, scientific, strategic, commercial, or launch-capability contributions.
● Do not exaggerate its importance.
● Do not make unsupported claims.

FACT:
● Provide exactly ONE interesting fact.
● The fact must be historically or technically verified.
● The fact must specifically relate to the requested launch vehicle.
● Do not invent an interesting fact.
● Do not repeat an already stated detail unless it provides meaningful additional context.

FORMATTING RULES:
● Follow the exact structure requested by the user.
● Do not add extra sections.
● Do not remove required sections.
● Do not change the order of sections.
● Use the exact labels provided.
● Use the exact emojis provided.
● Use "- " only for the Key Details fields.
● Do not use tables.
● Do not use Markdown headings such as # or ##.
● Do not add an introduction before the requested structure.
● Do not add a conclusion after the requested structure.
● Keep the response concise, professional, and easy to read.
● Use complete and grammatically correct sentences.

MISSING OR UNCERTAIN INFORMATION:
● Never guess.
● Use exactly "Not reliably available" when reliable information is unavailable.
● If a value is approximate, clearly identify it as approximate.
● If a value varies by configuration, explicitly state that it is configuration-dependent.

FINAL VALIDATION:
Before generating the response, internally verify:
● Is the launch-vehicle name correct?
● Is the vehicle type correct?
● Is the stage count correct for this specific vehicle?
● Is the payload capacity associated with the correct orbit?
● Are the technical facts specific to this launcher?
● Are the historical claims accurate?
● Are the missions correctly attributed?
● Is the vehicle's operational/developmental/retired status correct?
● Have any specifications been guessed?
● Does the response exactly follow the requested structure?

If any requested information cannot be confidently established, use "Not reliably available" rather than guessing.
`
  },
  {
    role: "user",
    content: `
Launcher Name: ${name}

Provide the response in EXACTLY this structure and order:

🚀 Mission Name: <official launch vehicle name>

📌 Mission Purpose:
<Briefly explain what the launch vehicle was designed to accomplish in 1–2 concise sentences>

🔧 Key Details:
- Type: <launch vehicle classification>
- Stages: <number of stages; include relevant boosters only when technically appropriate>
- Payload capacity: <capacity with the relevant orbit/configuration when reliably known>
- Notable technical facts: <only verified technical information specific to this launch vehicle>

🌍 Importance to India:
<Explain in 1–2 concise sentences why this launch vehicle was historically or technologically significant to India's space programme>

⭐ Fact:
<Provide exactly ONE verified interesting fact>

STRICT OUTPUT RULES:
● Output ONLY the structure above.
● Do not add an introduction.
● Do not add a conclusion.
● Do not add extra sections.
● Do not change the labels.
● Do not change the order.
● Do not use tables.
● Do not add additional bullet points outside Key Details.
● Do not invent missing information.
● Use "Not reliably available" when reliable information is unavailable.
● Clearly identify approximate or configuration-dependent values.
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
      🚀 ISRO Launchers
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
                <div style={{ fontSize: "30px" }}>🚀</div>
                <h6 className="mt-2">{item.name}</h6>
                <small className="fw-bold text-success">
                  ID: {item.id}
                </small>

                 <button
                  onClick={() => explainLaunchers(item.id)}
                  className="btn btn-warning btn-sm rounded-circle"
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

                {/* Favorite Button */}
                <button
                  className="btn btn-dark btn-sm mt-2"
                  onClick={() => addToFavorites(item)}
                >
                  ⭐ Add to Favorites
                </button>

              </div>
            </div>
          ))
        ) : (
          <div className="text-center mt-4">
            <h5>No launcher found 😕</h5>
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
              <h5>🧠 AI Launchers Explorer</h5>
              <button onClick={() => setShowModal(false)}>✖</button>
            </div>

            <div className="ai-body">
              <h6 className="mb-2">🚀 {selectedCraft}</h6>

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

export default Launchers;