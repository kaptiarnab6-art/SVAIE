

const Loader = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "60vh" }}
    >
      <div className="text-center">

        {/* Bootstrap Spinner */}
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>

        {/* Loading Text */}
        <p className="mt-3 fw-semibold text-muted">
          Loading data...
        </p>

      </div>
    </div>
  );
};

export default Loader;