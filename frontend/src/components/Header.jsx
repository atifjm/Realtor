import "./Header.scss";
import {Link} from "react-router-dom"

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <span className="logo-title1">Daman</span>
        <span className="logo-title2">Estate</span>
      </div>

      <form>
        <input className="search-input" type="text" placeholder="Search . . . . ." />
      </form>

      <div className="menu-bar">
        <ul className="menu-items">
          <Link to="/" className="links"><li className="menu-item">Home</li></Link>
          <Link to="/about" className="links"><li className="menu-item">About</li></Link>
          <Link to="login" className="links"><li className="menu-item">Login</li></Link>
          <Link to="register" className="links"><li className="menu-item">Register</li></Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
