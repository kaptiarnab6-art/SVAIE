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
    bg_img: "/nasa_exp.avif",
    icon: <Rocket size={45} className="text-primary" />,
    path: "/nasa_dashboard",
  },
  {
    title: "ISRO Explorer",
    description: "Discover ISRO satellites, launch vehicles, missions...",
    icon: <Satellite size={45} className="text-warning" />,
    bg_img: "/isro_exp.avif",
    path: "/isro_dashboard",
  },
  {
    title: "Space Library",
    description: "Browse the Space in your palm......",
    icon: <Image size={45} className="text-danger" />,
    bg_img: "/lib_exp.avif",
    path: "/space_library",
  }
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}

      <section
        className="position-relative text-white text-center d-flex align-items-center justify-content-center overflow-hidden"
        style={{ minHeight: "550px" }}
      >
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            objectFit: "cover",
            zIndex: 0,
          }}
        >
          <source
            src="/bg-video.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dark Overlay */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundColor: "rgba(12, 12, 12, 0.45)",
            zIndex: 1,
          }}
        />

        {/* Hero Content */}
        <div className="container position-relative py-5" style={{ zIndex: 2 }}>
          <h1 className="display-3 fw-bold mb-4">
            Space Vision AI Explorer
          </h1>

          <p className="lead mb-4">
            Explore NASA & ISRO missions, discover space images,
            track launches and learn everything with AI.
          </p>

          <Link
            to="/nasa_dashboard"
            className="btn btn-primary btn-lg me-3"
          >
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

        <div className="card-group gap-3">
          {features.map((item, index) => (

            <div className="card shadow rounded-5" key={index}>
              <img className="card-img-top rounded-top-5" src= {`${item.bg_img}`} alt="image not found" style={{height: "14rem"}}/>
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.description}</p>
                <Link
                    to={item.path}
                    className="btn btn-outline-primary m-1"
                  >
                    Explore
                </Link>
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