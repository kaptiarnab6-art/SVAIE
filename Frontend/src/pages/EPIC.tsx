import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

const EPIC = () => {
  const [info, setInfo] = useState<any[]>([]);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      let res;

      if (!date) {
        res = await axios.get(
          "https://epic.gsfc.nasa.gov/api/natural"
        );
      } else {
        res = await axios.get(
          `https://epic.gsfc.nasa.gov/api/natural/date/${date}`
        );
      }

      setInfo(res.data);
    } catch (err) {
      console.error(err);
      setInfo([]);
    } finally {
      setLoading(false);
    }
  };

  const imgUrl = (date: string, image: string) => {
    const [year, month, day] = date.split(" ")[0].split("-");

    return `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${image}.png`;
  };

  useEffect(() => {
    fetchData();
  }, [date]);

 return (
  <div className="container py-4">

    <h2 className="text-center bg-secondary text-white fw-bold mb-4 rounded-top-pill">
      EPIC Earth
    </h2>

    {/* Fixed Search Bar */}
    <div 
      className="sticky-top bg-transparent py-3 mb-4"
      style={{ 
        top: "50px",
        zIndex: 1000
      }}
    >
      <div className="d-flex justify-content-center">
        <div style={{ maxWidth: "350px", width: "100%" }}>
          <input
            type="date"
            className="form-control shadow rounded-pill px-4 py-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{
              border: "2px solid #6300d3ff",
              fontSize: "16px",
              cursor: "pointer"
            }}
          />

        </div>
      </div>
    </div>


    {loading ? (
     <Loader/>
    ) : info.length === 0 ? (

      <div className="text-center">
        <h4>No images found.</h4>
      </div>

    ) : (

      <div className="row g-4">

        {info.map((v: any) => (

          <div className="col-md-4" key={v.identifier}>

            <div className="card h-100 shadow-lg border-0 rounded-4 overflow-hidden">

              <a 
                href={imgUrl(v.date, v.image)} 
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={imgUrl(v.date, v.image)}
                  alt={v.caption}
                  className="card-img-top"
                  style={{
                    height: "220px",
                    objectFit: "cover"
                  }}
                />
              </a>


              <div className="card-body">

                <p>
                  📅<strong>Date & Time:</strong> {v.date}
                </p>

                <p>
                  🌐 <strong>Latitude:</strong>{" "}
                  {v.centroid_coordinates?.lat}
                </p>

                <p>
                  🌐 <strong>Longitude:</strong>{" "}
                  {v.centroid_coordinates?.lon}
                </p>

                  <p className="text-muted">
                  • {v.caption}
                </p>

              </div>

            </div>

          </div>

        ))}

      </div>

    )}

  </div>
);
};

export default EPIC;