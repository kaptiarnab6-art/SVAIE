import axios from "axios";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";

const Galaxy = () => {

  const [info, setInfo] = useState<any>(null);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // 🧠 AI states
  const [aiResponse, setAiResponse] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://images-api.nasa.gov/search?q=Galaxy"
      );

      setInfo(res.data.collection);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  // Safe filtering
  const filteredItems =
    info?.items?.filter((item: any) =>
      item.data?.[0]?.title?.toLowerCase().includes(search.trim().toLowerCase()) ||
      item.data?.[0]?.nasa_id?.toLowerCase().includes(search.trim().toLowerCase())
    ) || [];

    // 🧠 Groq AI Explain Feature
const explainGalaxy = async (name: string) => {
  setAiLoading(true);
  setSelectedItem(name);
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
              "You are an NASA space galaxy expert. Give accurate, historically correct, concise structured explanations. Do NOT hallucinate or invent specifications.",
          },
          {
            role: "user",
            content: `
                Galaxy Name: ${name}

                Provide response in this STRICT format:

                🌌 Galaxy Name: <official name>

                📌 About:
                <Brief explanation of what this galaxy is>

                🔭 Galaxy Details:
                - Type (Spiral/Elliptical/Irregular):
                - Distance from Earth:
                - Estimated Size:
                - Number of Stars (if known):
                - Constellation:
                - Discovery Information:

                🌠 Scientific Importance:
                <Why this galaxy is important for astronomy research>

                ⭐ Interesting Fact:
                <Only provide a verified interesting fact>

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



  if (loading) {
    return (
      <Loader/>
    );
  }


  return (
    <div className="container py-4">

      <div className="text-center mb-4">
        <h1 className="fw-bold">
          NASA Galaxy Collection
        </h1>

        <p className="text-muted">
          Explore breathtaking galaxy images from NASA's Image Library.
        </p>
      </div>


      {/* Search */}
      <div className="sticky-top bg-white py-2 bg-transparent"  style={{top: "38px", zIndex: 10}}>
        <SearchBar
          value={search}
          onChange={setSearch}
        />
      </div>


      <div className="row g-4 mt-3">

        {
          filteredItems.length > 0 ? (

            filteredItems.map((item: any, index: number) => {

              const data = item.data?.[0];

              const image =
                item.links?.find(
                  (link: any) => link.rel === "preview"
                )?.href ||
                item.links?.[0]?.href;


              return (
                <div
                  className="col-md-6 col-lg-4"
                  key={index}
                >

                  <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">

                    {
                      image && (
                        <a href={image} target="_blank">
                          <img
                          src={image}
                          alt={data?.title}
                          className="card-img-top"
                          style={{
                            height: "250px",
                            objectFit: "cover"
                          }}
                        />
                        </a>
                      )
                    }


                    <div className="card-body">

                      <h5 className="card-title fw-bold">
                        {data?.title}
                      </h5>


                      <ul className="list-group list-group-flush">

                        <li className="list-group-item">
                          <strong>NASA ID:</strong>{" "}
                          {data?.nasa_id}
                        </li>


                       <li className="list-group-item">
                        <strong>Date:</strong>{" "}
                        {data?.date_created
                          ? new Date(data.date_created).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })
                          : "N/A"}
                      </li>

                      </ul>
                       {/* AI Button for each card */}
                        <button
                          className="btn btn-primary rounded-pill shadow-sm w-100"
                          onClick={() => explainGalaxy(data?.title)}
                        >
                          🤖 Ask AI
                        </button>

                    </div>

                  </div>

                </div>
              );

            })

          ) : (

            <div className="text-center mt-5">
              <h5 className="text-muted">
                No Galaxy found...
              </h5>
            </div>

          )
        }

      </div>

      {/* 🧠 AI MODAL */}
{showModal && (
  <div className="ai-overlay" onClick={() => setShowModal(false)}>
    <div
      className="ai-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="ai-header">
        <h5>🧠 AI Galaxy Explorer</h5>
        <button onClick={() => setShowModal(false)}>✖</button>
      </div>

      <div className="ai-body">
        <h6 className="mb-2"> {selectedItem}</h6>

        {aiLoading ? (
          <div className="ai-loading">
            🤖 Thinking like NASA scientist...
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


export default Galaxy;