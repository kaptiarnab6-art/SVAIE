import { NavLink } from "react-router-dom";
import logo from '../assets/logo.png'

const Navbar = () => {

  const navStyle = ({ isActive }: { isActive: boolean }) =>
    `nav-link fw-semibold ${
      isActive ? "text-info" : "text-light"
    }`;

  return (
    <nav
  className="navbar navbar-expand-lg bg-dark navbar-dark shadow sticky-top" style={{
        background:
          "linear-gradient(90deg, #1e002eff, #080863ff, #48082eff)"
      }}>

      <div className="container">

        {/* Brand */}
        <NavLink
          className="navbar-brand fw-bold fs-4"
          to="/"
        >
          <img src={logo} alt="logo" style={{height:30,width:30}}/>
          <i>SVAIE</i>
        </NavLink>


        {/* Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>


        {/* Menu */}
        <div
          className="collapse navbar-collapse"
          id="navbarMenu"
        >

          <ul className="navbar-nav ms-auto gap-2">

            <li className="nav-item">
              <NavLink
                to="/"
                className={navStyle}
              >
                Home
              </NavLink>
            </li>


            <li className="nav-item">
              <NavLink
                to="/nasa_dashboard"
                className={navStyle}
              >
                NASA Explorer
              </NavLink>
            </li>


            <li className="nav-item">
              <NavLink
                to="/isro_dashboard"
                className={navStyle}
              >
                ISRO Explorer
              </NavLink>
            </li>


            <li className="nav-item">
              <NavLink
                to="/space_library"
                className={navStyle}
              >
                Space Library
              </NavLink>
            </li>


            <li className="nav-item">
              <NavLink
                to="/chat"
                className="btn btn-outline-dark text-white rounded-pill px-3"
                style={{
        background:
          "linear-gradient(90deg, #ff0062ff, #ff00b7ff)"
      }}
              >
                🤖 AI Chat
              </NavLink>
            </li>

          </ul>

        </div>

      </div>

    </nav>
  );
};

export default Navbar;