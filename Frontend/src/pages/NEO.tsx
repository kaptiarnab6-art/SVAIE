import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

interface Datas {
  asteroids:[],
  total:number,
  hazardous:number,
  safe:number
}

const NEO = () => {
  const [info, setInfo] = useState<any>(null);
  const [infos, setInfos] = useState<Datas>({asteroids:[],total:0,hazardous:0,safe:0});

  const api_key = import.meta.env.VITE_NASA_API_KEY;

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${api_key}`
      );
      setInfo(res.data);
       const asteroids = res.data.near_earth_objects;
       const total = asteroids.length;
       const hazardous = asteroids.filter(
        (a: any) => a.is_potentially_hazardous_asteroid
       ).length;
       const safe = total - hazardous;
       setInfos({asteroids:asteroids,total:total,hazardous:hazardous,safe:safe})
    } catch (err) {
      console.log(err);
      alert(err)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
return (
  <div style={{ position: "relative", minHeight: "100vh" }}>

    {/* FIXED SPACE BACKGROUND */}
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        backgroundImage: `
          linear-gradient(
            rgba(2, 6, 30, 0.88),
            rgba(2, 6, 30, 0.51)
          ),
          url("objects_bg.jpg")
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        zIndex: -1,
      }}
    />

    {/* SCROLLABLE CONTENT */}
    <div className="container py-4 position-relative">

      {/* Heading */}
      <h2 className="text-center mb-4 py-3 rounded-3 text-white shadow">
        ☄️ Near Earth Objects
      </h2>

     {
      info ? 
<div>
      <div className="row g-3 mb-4">

        {/* Total NEOs */}
        <div className="col-md-4">
          <div
            className="card text-center shadow-sm border-primary h-100"
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              borderRadius: "15px",
            }}
          >
            <div className="card-body">
              <h5 className="card-title fw-bold">
                🌍 Total NEOs
              </h5>
              <h2 className="text-primary fw-bold">{infos.total}</h2>
            </div>
          </div>
        </div>

        {/* Hazardous */}
        <div className="col-md-4">
          <div
            className="card text-center shadow-sm border-danger h-100"
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              borderRadius: "15px",
            }}
          >
            <div className="card-body">
              <h5 className="card-title fw-bold">
                ⚠️ Hazardous
              </h5>
              <h2 className="text-danger fw-bold">{infos.hazardous}</h2>
            </div>
          </div>
        </div>

        {/* Safe */}
        <div className="col-md-4">
          <div
            className="card text-center shadow-sm border-success h-100"
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              borderRadius: "15px",
            }}
          >
            <div className="card-body">
              <h5 className="card-title fw-bold">
                ✅ Safe
              </h5>
              <h2 className="text-success fw-bold">{infos.safe}</h2>
            </div>
          </div>
        </div>

      </div>

      {/* Asteroid Cards */}
      <div className="row g-4">

        {infos.asteroids.map((v: any) => (
          <div className="col-lg-4 col-md-6" key={v.id}>

            <div
              className="card h-100 shadow border-0"
              style={{
                background: "rgba(255, 255, 255, 0.96)",
                borderRadius: "15px",
                overflow: "hidden",
              }}
            >

              <div className="card-body">

                <h5 className="card-title fw-bold text-dark mb-3">
                  ☄️ {v.name}
                </h5>

                <p className="mb-2">
                  <strong>ID:</strong> {v.id}
                </p>

                <p className="mb-2">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`badge ${
                      v.is_potentially_hazardous_asteroid
                        ? "bg-danger"
                        : "bg-success"
                    }`}
                  >
                    {v.is_potentially_hazardous_asteroid
                      ? "Hazardous"
                      : "Safe"}
                  </span>
                </p>

                <p className="mb-2">
                  <strong>Magnitude:</strong>{" "}
                  {v.absolute_magnitude_h}
                </p>

                <p className="mb-3">
                  <strong>Diameter:</strong>{" "}
                  {Math.round(
                    v.estimated_diameter.meters
                      .estimated_diameter_min
                  )}{" "}
                  m -
                  {Math.round(
                    v.estimated_diameter.meters
                      .estimated_diameter_max
                  )}{" "}
                  m
                </p>

                {/* NASA JPL Button */}
                <a
                  href={v.nasa_jpl_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary rounded-pill w-100"
                >
                  <i className="bi bi-globe me-2"></i>
                  View NASA JPL
                </a>

              </div>
            </div>

          </div>
        ))}

      </div>
      </div>
      :
      <Loader/>
     }

    </div>
  </div>
);

};

export default NEO;