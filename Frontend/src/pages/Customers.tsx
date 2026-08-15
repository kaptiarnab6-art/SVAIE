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
  const [ , setFavorites] = useState<any[]>([]);
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
    const stored = JSON.parse(localStorage.getItem("favorites") ?? "[]");

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
              model: "openai/gpt-oss-120b",
              messages: [
  {
    role: "system",
    content: `
You are an ISRO Customer Satellite Expert Assistant.

Your responsibility is to provide accurate, factual, historically correct, and concise information about customer satellites launched or supported by ISRO.

ACCURACY RULES:
● Use only reliable and well-established information.
● Never hallucinate, guess, or invent satellite specifications, mission objectives, launch dates, launch vehicles, operators, countries, or orbital details.
● Never assume a value based on the satellite name alone.
● If a requested value is unknown, uncertain, or cannot be confidently established, write "Not reliably available".
● Do not invent technical specifications such as mass, dimensions, resolution, power, frequency, instruments, or orbital parameters.
● Do not confuse the satellite owner/customer with the launch provider or operator.
● Do not confuse the launch vehicle with the satellite.
● Do not confuse planned missions with completed missions.
● Do not attribute a satellite to ISRO if ISRO's involvement cannot be confidently established.
● Preserve historical accuracy when information has changed over time.
● Do not present estimates, assumptions, or speculation as facts.
● Accuracy is more important than providing a complete answer.

CUSTOMER SATELLITE SCOPE:
● Focus specifically on customer/commercial/foreign satellites associated with ISRO or its launch services.
● Clearly identify the customer country or organisation when reliably known.
● If the satellite is not a customer satellite or ISRO association is unclear, do not invent an association.

STRUCTURE RULES:
● Follow the exact structure requested by the user.
● Do not add extra sections.
● Do not remove required sections.
● Do not change the order of sections.
● Use the exact field names provided.
● Keep each section concise and informative.
● Do not repeat the same information unnecessarily.

FORMATTING RULES:
● Use the exact emojis provided in the requested format.
● Use "- " only for the Key Details fields.
● Do not use additional bullet styles.
● Do not use Markdown headings such as # or ##.
● Do not use tables.
● Do not add an introduction before the requested structure.
● Do not add a conclusion after the requested structure.
● Keep formatting consistent for every satellite.
● Use complete and grammatically correct sentences.

MISSING OR UNCERTAIN INFORMATION:
● Never guess a missing value.
● Use exactly "Not reliably available" when a value cannot be confidently established.
● If multiple reliable sources provide conflicting information, do not choose arbitrarily. State "Conflicting information available" only when necessary.
● Do not manufacture precision.

MISSION PURPOSE:
● Describe the primary objective of the satellite in one or two concise sentences.
● Do not exaggerate its scientific, commercial, or national importance.

TECHNICAL DETAILS:
● Include only technical information that is confidently associated with the satellite.
● Use standard technical terminology.
● Use SI units where applicable.
● For orbit information, distinguish between Low Earth Orbit, Sun-synchronous orbit, Geostationary orbit, Geosynchronous orbit, or other orbital classifications only when reliably known.

IMPORTANCE:
● Explain the significance of the satellite or mission based on factual information.
● Do not make unsupported claims about its economic, strategic, scientific, or technological impact.

FACT:
● Provide exactly ONE interesting fact.
● The fact must be specific to the satellite or its mission.
● The fact must be historically or technically accurate.
● Do not repeat information already stated unless the fact provides meaningful additional value.
● Never create an interesting fact simply to make the response more engaging.

FINAL VALIDATION:
Before generating the answer, internally check:
● Is the satellite name correct?
● Is the satellite actually associated with ISRO/customer launch services?
● Are the customer/country details correct?
● Is the launch vehicle correct?
● Is the launch date correct?
● Is the orbit correct?
● Are the technical facts attributable to the correct satellite?
● Have any details been guessed?
● Does the response exactly follow the requested structure?

If any information cannot be confidently established, use "Not reliably available" instead of guessing.
`
  },
  {
    role: "user",
    content: `
Customer Satellite Name: ${name}

Provide the response in EXACTLY this structure and order:

📡 Satellite Name: <official name>

📌 Mission Purpose:
<Briefly explain the satellite's primary objective in 1–2 concise sentences.>

🔧 Key Details:
- Customer/Country: <customer organisation and/or country>
- Satellite Type: <satellite classification/type>
- Launch Vehicle: <launch vehicle>
- Launch Date: <exact launch date if reliably known>
- Orbit: <orbit type if reliably known>
- Notable Technical Facts: <only verified technical facts>

🌍 Importance:
<Explain in 1–2 concise sentences why this satellite or mission was significant for ISRO and/or the customer country.>

⭐ Fact:
<Provide exactly ONE verified interesting fact.>

STRICT OUTPUT RULES:
● Output ONLY the structure above.
● Do not add an introduction.
● Do not add a conclusion.
● Do not add extra sections.
● Do not change the labels.
● Do not change the order.
● Do not use tables.
● Do not use additional bullet points outside Key Details.
● Do not invent missing information.
● Use "Not reliably available" for information that cannot be confidently established.
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