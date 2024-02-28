import { useState } from "react";
import "../styles/Login.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux"
import {loginStart, loginSuccess, loginFailure} from "../redux/userSlice.js"

const Login = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {loading, error} = useSelector((state) => state.user)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginStart())
      const res = await axios.post("/auth/login", formData);
      if (res.data) {
        dispatch(loginSuccess(res.data))
        alert(res.data.message)
        navigate("/");
      } else {
        dispatch(loginFailure(res.data.message))
        alert(res.data.message);
      }
    } catch (err) {
      dispatch(loginFailure(err.message))
      console.log(err);
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form className="form-login" onSubmit={handleSubmit}>
        <input
          className="input-field"
          type="text"
          placeholder="Enter Username"
          name="username"
          onChange={handleChange}
        />
        {/*<input
          className="input-field"
          type="email"
          placeholder="Enter Email"
          name="email"
          onChange={handleChange}
        />
        */}
        <input
          className="input-field"
          type="password"
          placeholder="Enter Password"
          name="password"
          onChange={handleChange}
        />
        <button className="input-button" type="submit">
          LOGIN
        </button>
      </form>
      <div className="form-bottom">
        <p className="para-line">Don't have an account ? </p>
        <Link to="/register" className="link-login links">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
