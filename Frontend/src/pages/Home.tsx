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
      <div className="container-fluid py-3"
        style={{
          backgroundImage: `
            linear-gradient(rgba(5, 10, 30, 0.65), rgba(5, 10, 30, 0.85)),
            url("/home_bg.avif")
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}>

      {/* Hero Section */}

      <section
        className="position-relative text-white text-center d-flex align-items-center rounded-5 justify-content-center overflow-hidden"
        style={{
            minHeight: "550px",
            border: "2px solid transparent",
            borderRadius: "20px",
            background: `
              linear-gradient(#0b1026, #0b1026) padding-box,
              linear-gradient(135deg, #67fcffc8, #55ffd2cc, #ffdf7eb6) border-box
            `,
          }}
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
      
{/* Explore Space */}
<section
  
>
  <div className="container py-5">
    <h2 className="text-center fw-bold mb-5 text-white">
      Explore Space
    </h2>

    <div className="row g-4">
      {features.map((item, index) => (
        <div className="col-12 col-md-6 col-lg-4" key={index}>
          <div className="card shadow rounded-5 h-100 overflow-hidden" style={{background:"#e8fddbff"}}>
            <img
              className="card-img-top"
              src={item.bg_img}
              alt={item.title}
              style={{
                height: "14rem",
                objectFit: "cover",
              }}
            />

            <div className="card-body d-flex flex-column" style={{ background: `linear-gradient(135deg, #b5ff8763, #7fd6ff74, #ff93d776) border-box
            `}}>
              <h5 className="card-title">{item.title}</h5>

              <p className="card-text">{item.description}</p>

             <div className="mt-auto">
              <Link to={item.path} className="explore-btn m-1">
                Explore
              </Link>
            </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

{/* About */}
<section
  className="py-5 text-white rounded-5"
  style={{
    backgroundImage: `
      linear-gradient(rgba(8, 15, 40, 0.82), rgba(15, 25, 55, 0.9)),
      url("/home_about_bg.avif")
    `,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  <div className="container text-center">
    <Telescope size={60} className="mb-3 text-info" />

    <h2 className="fw-bold mb-3">
      Learn Space with AI
    </h2>

    <p
      className="mx-auto text-light"
      style={{ maxWidth: "800px" }}
    >
      Space Vision AI Explorer combines NASA APIs,
      ISRO APIs and Artificial Intelligence to provide
      easy-to-understand explanations for missions,
      satellites, planets and space images.
    </p>
  </div>
</section>

{/* Statistics */}
<section className="container-fluid py-5">
  <div className="container">
    <div className="row text-center">
      <div className="col-6 col-md-3 mb-4" >
        <div className="card shadow-sm h-100 rounded-4" style={{ background: `linear-gradient(135deg, #ffd1a6ff, #f2bcfeff, #b3ffbdff) border-box
            `}}>
          <div className="card-body">
            <h2 className="text-primary">100+</h2>
            <p className="mb-0">NASA Missions</p>
          </div>
        </div>
      </div>

      <div className="col-6 col-md-3 mb-4">
        <div className="card shadow-sm h-100 rounded-4" style={{ background: `linear-gradient(135deg, #fff1cfff, #e8fff7ff, #b3d6ffff) border-box
            `}}>
          <div className="card-body">
            <h2 className="text-warning">50+</h2>
            <p className="mb-0">ISRO Missions</p>
          </div>
        </div>
      </div>

      <div className="col-6 col-md-3 mb-4">
        <div className="card shadow-sm h-100 rounded-4" style={{ background: `linear-gradient(135deg, #cce1ffff, #fee0ecff, #cdffd4ff) border-box
            `}}>
          <div className="card-body">
            <h2 className="text-success">1000+</h2>
            <p className="mb-0">Space Images</p>
          </div>
        </div>
      </div>

      <div className="col-6 col-md-3 mb-4">
        <div className="card shadow-sm h-100 rounded-4" style={{ background: `linear-gradient(135deg, #dfffd1ff, #fde0eaff, #ffebc9ff) border-box
            `}}>
          <div className="card-body">
            <h2 className="text-info">AI</h2>
            <p className="mb-0">Powered Learning</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      </div>

    </>
  );
}