import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";

const topics = [
  "Mars",
  "Moon",
  "Earth",
  "Saturn",
  "Jupiter",
  "Black Hole",
  "Nebula",
  "Galaxy",
  "Apollo",
  "Artemis",
  "Hubble",
  "James Webb",
  "Perseverance",
  "Curiosity",
  "ISS",
  "Space Shuttle",
  "Astronaut",
];

const NASA_ivl = () => {
  const [info, setInfo] = useState<any>(null);
  const [allInfo, setAllInfo] = useState<any>(null);

  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [selectedItem, setSelectedItem] = useState<any>(null);


  const fetchData = async () => {
    if (!link) return;

    setLoading(true);

    try {
      const res = await axios.get(
        `https://images-api.nasa.gov/search?q=${link}`
      );

      setAllInfo(res.data.collection);
      setInfo(res.data.collection);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [link]);

  useEffect(() => {
    if (!allInfo) return;

    if (search.trim() === "") {
      setInfo(allInfo);
      return;
    }

    const filtered = allInfo.items.filter((item: any) =>
      item.data?.[0]?.title
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

    setInfo({
      ...allInfo,
      items: filtered,
    });
  }, [search, allInfo]);


  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>

    {/* FIXED BACKGROUND IMAGE */}
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        backgroundImage: `
          linear-gradient(
            rgba(30, 2, 24, 0.67),
            rgba(3, 26, 18, 0.59)
          ),
          url("/space_library_bg.jpg")
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        zIndex: -1,
      }}
    />

    {/* SCROLLABLE CONTENT */}
    <div className="container-fluid py-4 position-relative">

      <div className="container">

        {/* Main Heading */}
        <h2 className="text-center fw-bold mb-4 text-white">
          🪐 Explore Space Topics
        </h2>

        {/* Topic Buttons */}
        <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">

          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => {
                setLink(topic);
                setTitle(topic);
                setSearch("");
              }}
              className={`btn rounded-pill px-4 py-2 fw-semibold ${
                link === topic
                  ? "btn-primary shadow"
                  : "btn-outline-light"
              }`}
            >
              {topic}
            </button>
          ))}

        </div>

        {loading ? (
          <Loader />
        ) : info ? (
          <>

            {/* Result Heading */}
            <h3 className="text-center fw-bold mb-4 text-white">
              NASA {title} Images
            </h3>

            {/* Search Bar */}
            <div
              className="sticky-top bg-transparent"
              style={{ top: "62px", zIndex: 10 }}
            >
              <SearchBar value={search} onChange={setSearch} />
            </div>

            {/* NASA Image Cards */}
            <div className="row g-4 mt-2">

              {info.items.length > 0 ? (

                info.items.map((item: any, index: number) => (
                  <div className="col-lg-4 col-md-6" key={index}>

                    <div
                      className="card h-100 shadow border-0"
                      style={{
                        background: "rgba(255, 255, 255, 0.96)",
                        borderRadius: "15px",
                        overflow: "hidden",
                      }}
                    >

                      {/* NASA Image */}
                      {item.links?.[0]?.href ? (
                        <img
                          src={item.links[0].href}
                          className="card-img-top"
                          style={{
                            height: 230,
                            objectFit: "cover",
                          }}
                          alt={item.data?.[0]?.title || "NASA Image"}
                        />
                      ) : (
                        <h4 className="text-center p-5">
                          😔 No Image Available
                        </h4>
                      )}

                      {/* Card Body */}
                      <div className="card-body d-flex flex-column">

                        <h5 className="fw-bold">
                          {item.data?.[0]?.title}
                        </h5>

                        <p className="text-muted flex-grow-1">

                          {item.data?.[0]?.description ? (
                            <>
                              {item.data[0].description.length > 120
                                ? item.data[0].description.slice(0, 120) + "..."
                                : item.data[0].description}

                              {item.data[0].description.length > 120 && (
                                <button
                                  className="btn btn-link btn-sm p-0 ms-2"
                                  data-bs-toggle="modal"
                                  data-bs-target="#detailsModal"
                                  onClick={() => setSelectedItem(item)}
                                >
                                  More
                                </button>
                              )}
                            </>
                          ) : (
                            "No Description"
                          )}

                        </p>

                        {/* View Image Button */}
                        {item.links?.[0]?.href && (
                          <a
                            href={item.links[0].href}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-info rounded-pill mb-2"
                          >
                            View Image
                          </a>
                        )}

                        {/* Explore Button */}
                        <button
                          className="btn btn-dark rounded-pill"
                          data-bs-toggle="modal"
                          data-bs-target="#detailsModal"
                          onClick={() => setSelectedItem(item)}
                        >
                          <i className="bi bi-stars me-2"></i>
                          Explore
                        </button>

                      </div>
                    </div>

                  </div>
                ))

              ) : (
                <h3 className="text-center text-white mt-4">
                  No Result Found
                </h3>
              )}

            </div>

          </>
        ) : (

          <h4 className="text-center mt-5 text-white">
            😊 Please select a topic
          </h4>

        )}

      </div>

      {/* BOOTSTRAP MODAL */}
      <div
        className="modal fade"
        id="detailsModal"
        tabIndex={-1}
      >
        <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">

          <div className="modal-content">

            {/* Modal Header */}
            <div className="modal-header">

              <h4 className="modal-title fw-bold">
                {selectedItem?.data?.[0]?.title}
              </h4>

              <button
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>

            </div>

            {/* Modal Body */}
            <div className="modal-body text-center">

              {selectedItem && (
                <>

                  {/* Selected Image */}
                  {selectedItem.links?.[0]?.href && (
                    <img
                      src={selectedItem.links[0].href}
                      className="img-fluid rounded shadow mb-4 w-100"
                      style={{
                        maxHeight: "300px",
                        maxWidth: "500px",
                        objectFit: "contain",
                      }}
                      alt="NASA Image"
                    />
                  )}

                  {/* Details Table */}
                  <table className="table table-bordered">

                    <tbody>

                      <tr>
                        <th style={{ width: "200px" }}>Title</th>
                        <td>{selectedItem.data?.[0]?.title}</td>
                      </tr>

                      <tr>
                        <th style={{ width: "200px" }}>NASA ID</th>
                        <td>{selectedItem.data?.[0]?.nasa_id}</td>
                      </tr>

                      <tr>
                        <th>Description</th>
                        <td>
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                selectedItem.data?.[0]?.description ||
                                "No description available.",
                            }}
                          />
                        </td>
                      </tr>

                      <tr>
                        <th>Date Created</th>
                        <td>
                          {selectedItem.data?.[0]?.date_created
                            ? new Date(
                                selectedItem.data[0].date_created
                              ).toLocaleDateString("en-IN")
                            : "N/A"}
                        </td>
                      </tr>

                      <tr>
                        <th>Center</th>
                        <td>
                          {selectedItem.data?.[0]?.center || "N/A"}
                        </td>
                      </tr>

                      <tr>
                        <th>Secondary Creator</th>
                        <td>
                          {selectedItem.data?.[0]?.secondary_creator || "N/A"}
                        </td>
                      </tr>

                      <tr>
                        <th>Location</th>
                        <td>
                          {selectedItem.data?.[0]?.location || "N/A"}
                        </td>
                      </tr>

                    </tbody>

                  </table>

                </>
              )}

            </div>

            {/* Modal Footer */}
            <div className="modal-footer">

              {selectedItem?.links?.[0]?.href && (
                <a
                  href={selectedItem.links[0].href}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                >
                  Open Original Image
                </a>
              )}

              <button
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>

            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
  );
};

export default NASA_ivl;