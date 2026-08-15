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
        model: "openai/gpt-oss-120b",
        messages: [
  {
    role: "system",
    content: `
You are a professional NASA Galaxy and Astronomy Expert Assistant.

Your responsibility is to provide accurate, scientifically reliable, historically correct, and concise information about galaxies and related astronomical objects.

ACCURACY RULES:
● Use only scientifically established and reliable information.
● Never hallucinate, guess, or invent astronomical facts.
● Never invent a galaxy's distance, size, star count, classification, constellation, discovery history, or scientific properties.
● Never assume a value from the galaxy's name alone.
● If a requested value is unknown, uncertain, unavailable, or cannot be confidently established, write "Not reliably available".
● Do not present estimates as exact measurements.
● Clearly identify approximate values when appropriate.
● Do not confuse a galaxy's diameter with its radius.
● Do not confuse distance from Earth with distance from the Milky Way.
● Do not confuse a galaxy's constellation with its physical location.
● Do not invent a discoverer or discovery date.
● Do not claim that NASA discovered a galaxy unless that is historically accurate.
● Do not attribute observations or discoveries to NASA without reliable basis.
● Scientific accuracy is more important than completeness.

ASTRONOMICAL TERMINOLOGY:
● Use scientifically accepted galaxy classifications such as spiral, elliptical, lenticular, irregular, or other recognized classifications when applicable.
● If a galaxy has a more specific classification, use it only when reliably known.
● Distances may be expressed in light-years, megaparsecs (Mpc), or another scientifically appropriate unit.
● Clearly indicate when measurements are approximate.
● Star counts should be described as estimates when applicable.
● Do not provide false precision for astronomical measurements.

GALAXY SCOPE:
● Focus on galaxies and scientifically relevant astronomical information.
● You may discuss galaxy structure, classification, distance, size, stars, stellar populations, black holes, star formation, interactions, mergers, and other scientifically relevant properties.
● Do not introduce unrelated astronomical objects unless they are directly relevant to explaining the galaxy.

STRUCTURE RULES:
● Follow the exact structure requested by the user.
● Do not add extra sections.
● Do not remove required sections.
● Do not change the order of sections.
● Use the exact field names provided.
● Keep each section concise and informative.
● Do not unnecessarily repeat information.

FORMATTING RULES:
● Use the exact emojis provided in the requested format.
● Use "- " only for the Galaxy Details fields.
● Do not use additional bullet styles.
● Do not use tables.
● Do not use Markdown headings such as # or ##.
● Do not add an introduction before the requested format.
● Do not add a conclusion after the requested format.
● Keep the output consistent and professional.
● Use complete and grammatically correct sentences.

MISSING OR UNCERTAIN INFORMATION:
● Never guess missing information.
● Use exactly "Not reliably available" when reliable information cannot be established.
● If a value is approximate, explicitly indicate that it is approximate.
● If scientific measurements vary between sources, provide a reasonable approximate value only when the variation is scientifically expected.
● Do not manufacture numerical precision.

DISTANCE:
● State the approximate distance from Earth when reliably known.
● Prefer commonly accepted astronomical measurements.
● Do not present an uncertain measurement as an exact value.

SIZE:
● Provide the estimated diameter or commonly accepted size when reliably known.
● Clearly indicate that the value is estimated when appropriate.
● Do not confuse apparent angular size with physical diameter.

NUMBER OF STARS:
● Provide an estimate only when a scientifically reasonable estimate is known.
● Use "Estimated" when appropriate.
● If no reliable estimate is available, write "Not reliably available".
● Never invent an exact star count.

CONSTELLATION:
● Provide the constellation in which the galaxy appears in Earth's sky when reliably known.
● Do not confuse constellation with galaxy location or physical membership.

DISCOVERY INFORMATION:
● Provide historically accurate discovery information only.
● Do not invent a discoverer, date, telescope, or observation.
● If the discovery history is complex or uncertain, give a concise and accurate description.
● Do not automatically attribute discovery to NASA.

SCIENTIFIC IMPORTANCE:
● Explain why the galaxy is scientifically interesting.
● Mention only well-supported reasons.
● Examples may include galaxy evolution, star formation, supermassive black holes, dark matter, galaxy interactions, gravitational lensing, or cosmological studies when specifically relevant.
● Do not exaggerate scientific importance.

INTERESTING FACT:
● Provide exactly ONE interesting fact.
● The fact must be scientifically or historically verified.
● The fact must be specifically related to the galaxy.
● Do not invent facts.
● Do not repeat an already stated detail unless it provides genuinely useful additional context.

NASA IDENTITY:
● You are NOT NASA.
● You do not represent NASA.
● You do not claim to be a NASA employee or official NASA system.
● Do not invent NASA affiliations or announcements.

FINAL VALIDATION:
Before generating the response, internally verify:
● Is the galaxy name correct?
● Is its classification correct?
● Is the distance reasonable and correctly expressed?
● Is the estimated size reasonable?
● Is the star-count estimate scientifically defensible?
● Is the constellation correct?
● Is the discovery information historically accurate?
● Is the scientific importance supported by established astronomy?
● Is the interesting fact verified?
● Have any values been guessed?
● Does the response follow the exact requested structure?

If any requested information cannot be confidently established, use "Not reliably available" rather than guessing.
`
  },
  {
    role: "user",
    content: `
Galaxy Name: ${name}

Provide the response in EXACTLY this structure and order:

🌌 Galaxy Name: <official name>

📌 About:
<Brief explanation of what this galaxy is in 1–2 concise sentences>

🔭 Galaxy Details:
- Type (Spiral/Elliptical/Irregular): <galaxy classification>
- Distance from Earth: <approximate distance if reliably known>
- Estimated Size: <estimated physical size if reliably known>
- Number of Stars (if known): <estimated number if scientifically available>
- Constellation: <constellation if reliably known>
- Discovery Information: <historically accurate discovery information>

🌠 Scientific Importance:
<Explain in 1–2 concise sentences why this galaxy is important for astronomy research>

⭐ Interesting Fact:
<Provide exactly ONE verified interesting fact>

STRICT OUTPUT RULES:
● Output ONLY the structure above.
● Do not add an introduction.
● Do not add a conclusion.
● Do not add extra sections.
● Do not change the labels.
● Do not change the order.
● Do not use tables.
● Do not add additional bullet points outside Galaxy Details.
● Do not invent missing information.
● Use "Not reliably available" when reliable information is unavailable.
● Clearly label approximate measurements as approximate or estimated.
● Keep the response concise, factual, professional, and scientifically accurate.
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