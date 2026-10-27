import { Link } from "react-router-dom";

const cards = [
  {
    title: "Astronomy Picture of the Day",
    description:
      "Discover NASA's featured astronomy image with detailed explanations.",
    icon: "💫",
    path: "/apod",
  },
  {
    title: "Near Earth Objects",
    description:
      "Track asteroids and comets passing close to Earth.",
    icon: "🌠",
    path: "/neo",
  },
  {
    title: "EPIC Earth",
    description:
      "View stunning images of Earth captured from space.",
    icon: "🌍",
    path: "/epic",
  },
  {
    title: "Galaxy Images",
    description:
      "Browse beautiful galaxy images from NASA's archive.",
    icon: "🌌",
    path: "/galaxy",
  },
];

function App() {
  return (
    <div className="space-home">

      <div className="container space-container">

        {/* Header */}
        <div className="text-center space-header">
          <h1 className="fw-bold display-5">
            NASA Space Explorer
          </h1>

          <p className="space-subtitle">
            Explore NASA's space images, Earth observations,
            <br className="d-none d-md-block" /> and astronomy data.
          </p>
        </div>

        {/* Cards */}
        <div className="row g-4">
          {cards.map((card, index) => (
            <div
              className="col-12 col-sm-6 col-lg-3"
              key={card.path ?? index}
            >
              <div className="space-card h-100">

                <div className="card-body text-center d-flex flex-column">

                  {/* Icon */}
                  <div className="space-icon mx-auto mb-4">
                    {card.icon}
                  </div>

                  {/* Title */}
                  <h5 className="fw-bold space-card-title">
                    {card.title}
                  </h5>

                  {/* Description */}
                  <p className="space-description flex-grow-1">
                    {card.description}
                  </p>

                  {/* Explore Button */}
                  <Link
                    to={card.path}
                    className="space-button mx-auto"
                  >
                    Explore
                  </Link>

                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;