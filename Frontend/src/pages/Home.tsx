import { Link } from "react-router-dom";
import {
  Rocket,
  Satellite,
  Image,
  Telescope,
} from "lucide-react";

const features = [
  {
    title: "NASA Explorer",
    description: "Explore NASA missions, astronomy pictures, Galaxy images...",
    icon: <Rocket size={45} className="text-primary" />,
    path: "/nasa_dashboard",
  },
  {
    title: "ISRO Explorer",
    description: "Discover ISRO satellites, launch vehicles, missions...",
    icon: <Satellite size={45} className="text-warning" />,
    path: "/isro_dashboard",
  },
  {
    title: "Space Library",
    description: "Browse the Space in your palm......",
    icon: <Image size={45} className="text-danger" />,
    path: "/space_library",
  }
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-dark text-white text-center py-5" style={{
        background:
          "linear-gradient(90deg, #020024, #090979, #00d4ff)"
      }}>
        <div className="container py-5">

          <h1 className="display-3 fw-bold mb-4">
            Space Vision AI Explorer
          </h1>

          <p className="lead mb-4">
            Explore NASA & ISRO missions, discover space images,
            track launches and learn everything with AI.
          </p>

          <Link to="/nasa_dashboard" className="btn btn-primary btn-lg me-3">
            Explore NASA
          </Link>

          <Link to="/chat" className="btn btn-outline-light btn-lg">
            Ask AI
          </Link>

        </div>
      </section>

      {/* Features */}
      <section className="container py-5">

        <h2 className="text-center fw-bold mb-5">
          Explore Space
        </h2>

        <div className="row g-4">

          {features.map((item, index) => (
            <div className="col-md-6 col-lg-4" key={index}>

              <div className="card shadow h-100 border-0">

                <div className="card-body text-center p-4">

                  <div className="mb-3">
                    {item.icon}
                  </div>

                  <h4>{item.title}</h4>

                  <p className="text-muted">
                    {item.description}
                  </p>

                  <Link
                    to={item.path}
                    className="btn btn-outline-primary"
                  >
                    Explore
                  </Link>

                </div>

              </div>

            </div>
          ))}

        </div>

      </section>

      {/* About */}
      <section className="bg-light py-5">

        <div className="container text-center">

          <Telescope size={60} className="mb-3 text-primary" />

          <h2 className="fw-bold mb-3">
            Learn Space with AI
          </h2>

          <p className="text-muted mx-auto" style={{ maxWidth: "800px" }}>
            Space Vision AI Explorer combines NASA APIs,
            ISRO APIs and Artificial Intelligence to provide
            easy-to-understand explanations for missions,
            satellites, planets and space images.
          </p>

        </div>

      </section>

      {/* Statistics */}

      <section className="container py-5">

        <div className="row text-center">

          <div className="col-md-3 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h2 className="text-primary">100+</h2>
                <p>NASA Missions</p>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h2 className="text-warning">50+</h2>
                <p>ISRO Missions</p>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h2 className="text-success">1000+</h2>
                <p>Space Images</p>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h2 className="text-info">AI</h2>
                <p>Powered Learning</p>
              </div>
            </div>
          </div>

        </div>

      </section>
    </>
  );
}