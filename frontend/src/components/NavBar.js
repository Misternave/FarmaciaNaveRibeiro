import { Link } from "react-router-dom";
import logo from "../logo.png";

const NavBar = () => {
  return (
    <div className="nav-container">
      <img src={logo} alt="" className="logo" />
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/faqs">Faqs</Link>
          </li>
          <li>
            <Link to="/marcacoes/add">Marcacoes</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
