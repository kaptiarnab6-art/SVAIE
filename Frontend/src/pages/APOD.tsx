
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import DOMPurify from "dompurify";

const APOD = () => {
  const [info, setInfo] = useState<any>(null);
  const [allData, setAllData] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://science.nasa.gov/wp-json/wp/v2/apod-basic"
      );

      setAllData(res.data);
      setInfo(res.data[0]);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch NASA APOD data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Format explanation HTML safely
  const cleanHTML = info
    ? DOMPurify.sanitize(info.explanation, {
        ADD_ATTR: ["target", "rel"],
      })
    : "";

  // Make all explanation links open in a new tab
  const formattedHTML = cleanHTML.replace(
    /<a\b(?![^>]*\btarget=)/gi,
    '<a target="_blank" rel="noopener noreferrer" '
  );

  return (
    <div className="container py-4">

      <h2 className="text-center fw-bold text-primary mb-4">
        Astronomy Picture of the Day
      </h2>

      {info ? (
        <div className="card shadow-lg border-0 rounded-4 overflow-hidden">

          <div className="row g-0 align-items-center">

            {/* Image or Video */}
            <div className="col-lg-5 col-md-6 px-3">

              {info.media_type === "image" ? (
                <a
                  href={info.hdurl || info.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={info.hdurl || info.url}
                    alt={info.title}
                    className="img-fluid w-100 rounded"
                    style={{
                      objectFit: "cover",
                      minHeight: "300px",
                    }}
                  />
                </a>
              ) : (
                <div>
                  <iframe
                    src={info.url}
                    title={info.title}
                    allowFullScreen
                    className="w-100 rounded"
                    style={{
                      minHeight: "300px",
                      border: "none",
                    }}
                  />

                  <a
                    href={info.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="text-center mt-2">
                      Click here to Watch
                    </div>
                  </a>
                </div>
              )}

            </div>

            {/* Content */}
            <div className="col-lg-7 col-md-6">

              <div className="card-body p-4">

                <h3 className="fw-bold">
                  {info.title}
                </h3>

                <p className="text-muted">
                  📅{" "}
                  {new Date(info.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>

                {/* Formatted Explanation */}
                <div
                  className="apod-explanation text-secondary"
                  style={{ textAlign: "justify", lineHeight: "1.8" }}
                  dangerouslySetInnerHTML={{
                    __html: formattedHTML,
                  }}
                />

              </div>

            </div>

          </div>
        </div>
      ) : (
        <Loader />
      )}

    </div>
  );
};

export default APOD;
