import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

const NEO = () => {
  const [info, setInfo] = useState<any>(null);

  const api_key = import.meta.env.VITE_NASA_API_KEY;

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${api_key}`
      );
      setInfo(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!info)
    return (
      <Loader/>
    );

  const asteroids = info.near_earth_objects;

  const total = asteroids.length;
  const hazardous = asteroids.filter(
    (a: any) => a.is_potentially_hazardous_asteroid
  ).length;
  const safe = total - hazardous;

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4 py-2 rounded-3 bg-dark text-white">Near Earth Objects</h2>

      {/* Statistics */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card text-center shadow-sm border-primary">
            <div className="card-body">
              <h5 className="card-title">Total NEOs</h5>
              <h2 className="text-primary">{total}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow-sm border-danger">
            <div className="card-body">
              <h5 className="card-title">Hazardous</h5>
              <h2 className="text-danger">{hazardous}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow-sm border-success">
            <div className="card-body">
              <h5 className="card-title">Safe</h5>
              <h2 className="text-success">{safe}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Asteroid Cards */}
      <div className="row g-4">
        {asteroids.map((v: any) => (
          <div className="col-lg-4 col-md-6" key={v.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">☄ {v.name}</h5>

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

                <a
                  href={v.nasa_jpl_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary w-100"
                >
                  View NASA JPL
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NEO;