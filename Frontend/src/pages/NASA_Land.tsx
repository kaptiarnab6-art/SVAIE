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
    <div className="container py-4">

      {/* Header */}
      <div className="text-center mb-5">

        <h1 className="fw-bold display-5">
          NASA Space Explorer
        </h1>

        <p className="text-muted fs-5">
          Explore NASA's space images, Earth observations,
          and astronomy data.
        </p>

      </div>


      {/* Cards */}

      <div className="row g-4">

        {cards.map((card, index) => (

          <div
            className="col-md-6 col-lg-3"
            key={index}
          >

            <div
              className="card h-100 border-0 shadow-lg rounded-4"
            >

              <div className="card-body text-center d-flex flex-column p-4">


                {/* Icon */}

                <div
                  className="rounded-circle bg-primary bg-opacity-10 mx-auto mb-4 d-flex align-items-center justify-content-center"
                  style={{
                    width: "90px",
                    height: "90px",
                    fontSize: "45px"
                  }}
                >
                  {card.icon}
                </div>


                <h5 className="fw-bold">
                  {card.title}
                </h5>


                <p className="text-muted flex-grow-1">
                  {card.description}
                </p>


                <Link
                  to={card.path}
                  className="btn btn-primary rounded-pill fw-semibold mt-3"
                >
                  Explore
                </Link>


              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default App;