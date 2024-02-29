import "./Header.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { logout } from "../redux/userSlice";

const Header = () => {
  const currentUser = useSelector((state) => state.user);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = async() => {
    try {
      const res = await axios.post("/auth/logout")
      if(res.success){
        dispatch(logout())
        alert("User logoff successfully")
        navigate("/login")
      }
    } catch (err) {
      console.log(err)
      
    }
  }

  return (
    <div className="header">
      <div className="logo">
        <span className="logo-title1">Daman</span>
        <span className="logo-title2">Estate</span>
      </div>

      <form>
        <input
          className="search-input"
          type="text"
          placeholder="Search . . . . ."
        />
      </form>

      <div className="menu-bar">
        <ul className="menu-items">
          <Link to="/" className="links">
            <li className="menu-item">Home</li>
          </Link>
          <Link to="/about" className="links">
            <li className="menu-item">About</li>
          </Link>
          {currentUser ? (
            <>
              <Link to="login" className="links">
                <li className="menu-item" onClick={handleLogout}>Logout</li>
              </Link>
              {/*<Link to="profile" className="links">
                <li className="menu-item">
                  {currentUser.others.username ? (
                    <img>{currentUser.others.profileImg}</img>
                  ) : (
                    <img src="https://th.bing.com/th?id=OIP.5n41jHLjCl7Fk1NBVLkepgHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.1&pid=3.1&rm=2"></img>
                  )}
                </li>
                  </Link>*/}
            </>
          ) : (
            <>
              <Link to="login" className="links">
                <li className="menu-item">Login</li>
              </Link>
              <Link to="register" className="links">
                <li className="menu-item">Register</li>
              </Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
