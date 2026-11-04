import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [spacecrafts, setSpacecrafts] = useState<any[]>([]);
  const [launchers, setLaunchers] = useState<any[]>([]);
  const [centres, setCentres] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);

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
      console.error(err);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



  return (
    <div className="isro-home">

      <div className="container py-2">

        {/* HERO SECTION */}
        <div className="text-center isro-hero mb-5">

          <span className="badge rounded-pill bg-info text-dark px-3 py-2 mb-3">
            🇮🇳 India's Space Exploration
          </span>

          <h1 className="display-3 fw-bold text-white">
            ISRO <span className="hero-highlight">Explorer</span>
          </h1>

          <p className="text-white-50 fs-5 mx-auto hero-description">
            Discover India's journey beyond Earth. Explore spacecraft,
            launch vehicles, satellites and space research centres.
          </p>

          <div className="hero-line mx-auto"></div>

        </div>

        {/* STATISTICS */}
        <div className="row g-4">

          {/* SPACECRAFTS */}
          <div className="col-12 col-md-6 col-lg-4">
            <Link
              to="/spacecrafts"
              state={{ data: spacecrafts }}
              className="text-decoration-none"
            >
              <div className="card isro-card h-100 border-0">
                <div className="card-body p-4">

                  <div className="d-flex justify-content-between align-items-center">
                    <div className="isro-icon icon-blue">
                      🛰️
                    </div>
                    <span className="card-number">01</span>
                  </div>

                  <h4 className="fw-bold mt-4">Spacecrafts</h4>

                  <h1 className="fw-bold text-primary">
                    {spacecrafts.length}
                  </h1>

                  <p className="text-secondary">
                    Discover India's spacecraft and space exploration missions.
                  </p>

                  <div className="card-explore text-primary fw-bold">
                    Explore Spacecrafts <span>→</span>
                  </div>

                </div>
              </div>
            </Link>
          </div>

          {/* LAUNCHERS */}
          <div className="col-12 col-md-6 col-lg-4">
            <Link
              to="/launchers"
              state={{ data: launchers }}
              className="text-decoration-none"
            >
              <div className="card isro-card h-100 border-0">
                <div className="card-body p-4">

                  <div className="d-flex justify-content-between align-items-center">
                    <div className="isro-icon icon-green">
                      🚀
                    </div>
                    <span className="card-number">02</span>
                  </div>

                  <h4 className="fw-bold mt-4">Launch Vehicles</h4>

                  <h1 className="fw-bold text-success">
                    {launchers.length}
                  </h1>

                  <p className="text-secondary">
                    Explore powerful rockets developed by ISRO.
                  </p>

                  <div className="card-explore text-success fw-bold">
                    Explore Launchers <span>→</span>
                  </div>

                </div>
              </div>
            </Link>
          </div>

          {/* CENTRES */}
          <div className="col-12 col-md-6 col-lg-4">
            <Link
              to="/centres"
              state={{ data: centres }}
              className="text-decoration-none"
            >
              <div className="card isro-card h-100 border-0">
                <div className="card-body p-4">

                  <div className="d-flex justify-content-between align-items-center">
                    <div className="isro-icon icon-orange">
                      🏢
                    </div>
                    <span className="card-number">03</span>
                  </div>

                  <h4 className="fw-bold mt-4">Research Centres</h4>

                  <h1 className="fw-bold text-warning">
                    {centres.length}
                  </h1>

                  <p className="text-secondary">
                    Discover ISRO's research, development and launch centres.
                  </p>

                  <div className="card-explore text-warning fw-bold">
                    Explore Centres <span>→</span>
                  </div>

                </div>
              </div>
            </Link>
          </div>

          {/* CUSTOMERS */}
          <div className="col-12 col-md-6 col-lg-4">
            <Link
              to="/customers"
              state={{ data: customers }}
              className="text-decoration-none"
            >
              <div className="card isro-card h-100 border-0">
                <div className="card-body p-4">

                  <div className="d-flex justify-content-between align-items-center">
                    <div className="isro-icon icon-purple">
                      📡
                    </div>
                    <span className="card-number">04</span>
                  </div>

                  <h4 className="fw-bold mt-4">Customer Satellites</h4>

                  <h1 className="fw-bold text-info">
                    {customers.length}
                  </h1>

                  <p className="text-secondary">
                    Explore satellites launched for international customers.
                  </p>

                  <div className="card-explore text-info fw-bold">
                    Explore Satellites <span>→</span>
                  </div>

                </div>
              </div>
            </Link>
          </div>

          {/* FAVORITES */}
          <div className="col-12 col-md-6 col-lg-4">
            <Link
              to="/favorites"
              className="text-decoration-none"
            >
              <div className="card isro-card h-100 border-0">
                <div className="card-body p-4">

                  <div className="d-flex justify-content-between align-items-center">
                    <div className="isro-icon icon-pink">
                      ⭐
                    </div>
                    <span className="card-number">05</span>
                  </div>

                  <h4 className="fw-bold mt-4">My Favorites</h4>

                  <h1 className="fw-bold text-danger">
                    ❤
                  </h1>

                  <p className="text-secondary">
                    Keep your favorite space missions and discoveries together.
                  </p>

                  <div className="card-explore text-danger fw-bold">
                    View Favorites <span>→</span>
                  </div>

                </div>
              </div>
            </Link>
          </div>

          {/* AI CHAT */}
          <div className="col-12 col-md-6 col-lg-4">
            <Link
              to="/chat"
              className="text-decoration-none"
            >
              <div className="card isro-card ai-card h-100 border-0">
                <div className="card-body p-4">

                  <div className="d-flex justify-content-between align-items-center">
                    <div className="isro-icon icon-ai">
                      🤖
                    </div>
                    <span className="card-number">06</span>
                  </div>

                  <h4 className="fw-bold mt-4">Space AI Assistant</h4>

                  <h3 className="fw-bold text-primary mt-3">
                    Ask Anything!
                  </h3>

                  <p className="text-secondary">
                    Have questions about space? Talk with your AI space assistant.
                  </p>

                  <div className="card-explore text-primary fw-bold">
                    Start Conversation <span>→</span>
                  </div>

                </div>
              </div>
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Home;