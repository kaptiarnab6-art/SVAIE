import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

const Home = () => {
  const [spacecrafts, setSpacecrafts] = useState<any[]>([]);
  const [launchers, setLaunchers] = useState<any[]>([]);
  const [centres, setCentres] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [s1, s2, s3, s4] = await Promise.all([
          axios.get("https://isro.vercel.app/api/spacecrafts"),
          axios.get("https://isro.vercel.app/api/launchers"),
          axios.get("https://isro.vercel.app/api/centres"),
          axios.get("https://isro.vercel.app/api/customer_satellites"),
        ]);

        setSpacecrafts(s1.data.spacecrafts || []);
        setLaunchers(s2.data.launchers || []);
        setCentres(s3.data.centres || []);
        setCustomers(s4.data.customer_satellites || []);
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="container py-3">

  {/* Heading */}
  <div className="text-center mb-5">
    <h1 className="fw-bold">ISRO Explorer</h1>
    <p className="text-muted">
      Explore India's space missions, launch vehicles, satellites and research centres.
    </p>
  </div>

  <div className="row g-4">

    {/* Spacecrafts */}
    <div className="col-md-6 col-lg-4">
      <Link to="/spacecrafts" state={{data:spacecrafts}} className="text-decoration-none">
        <div className="card h-100 shadow border-0">
          <div className="card-body text-center">
            <div className="display-3">🛰️</div>

            <h4 className="mt-3">Spacecrafts</h4>

            <h1 className="text-primary fw-bold">
              {spacecrafts.length}
            </h1>

            <p className="text-muted">
              Explore all ISRO spacecrafts...
            </p>
          </div>
        </div>
      </Link>
    </div>

    {/* Launchers */}
    <div className="col-md-6 col-lg-4">
      <Link to="/launchers" state={{data:launchers}} className="text-decoration-none">
        <div className="card h-100 shadow border-0">
          <div className="card-body text-center">
            <div className="display-3">🚀</div>

            <h4 className="mt-3">Launchers</h4>

            <h1 className="text-success fw-bold">
              {launchers.length}
            </h1>

            <p className="text-muted">
              Browse launch vehicles developed by ISRO...
            </p>
          </div>
        </div>
      </Link>
    </div>

    {/* Centres */}
    <div className="col-md-6 col-lg-4">
      <Link to="/centres" state={{data:centres}} className="text-decoration-none">
        <div className="card h-100 shadow border-0">
          <div className="card-body text-center">
            <div className="display-3">🏢</div>

            <h4 className="mt-3">Centres</h4>

            <h1 className="text-warning fw-bold">
              {centres.length}
            </h1>

            <p className="text-muted">
              View ISRO research and launch centres...
            </p>
          </div>
        </div>
      </Link>
    </div>

    {/* Customers */}
    <div className="col-md-6 col-lg-4">
      <Link to="/customers" state={{data:customers}} className="text-decoration-none">
        <div className="card h-100 shadow border-0">
          <div className="card-body text-center">
            <div className="display-3">📡</div>

            <h4 className="mt-3">Customers</h4>

            <h1 className="text-info fw-bold">
              {customers.length}
            </h1>

            <p className="text-muted">
              International customer satellites...
            </p>
          </div>
        </div>
      </Link>
    </div>

    {/* Favorites */}
    <div className="col-md-6 col-lg-4">
      <Link to="/favorites" className="text-decoration-none">
        <div className="card h-100 shadow border-0">
          <div className="card-body text-center">
            <div className="display-3">⭐</div>

            <h4 className="mt-3">Favorites</h4>

            <h1 className="text-danger fw-bold">
              ❤
            </h1>

            <p className="text-muted">
              View your saved favourites...
            </p>
          </div>
        </div>
      </Link>
    </div>

    {/* Ask AI */}
    <div className="col-md-6 col-lg-4">
      <Link to="/chat" className="text-decoration-none">
        <div className="card h-100 shadow border-0">
          <div className="card-body text-center">
            <div className="display-3">🤖</div>

            <button className="btn btn-danger mt-5 rounded-circle p-3">
              Let's Ask to AI
            </button>
          </div>
        </div>
      </Link>
    </div>

  </div>

</div>
  );
};

export default Home;