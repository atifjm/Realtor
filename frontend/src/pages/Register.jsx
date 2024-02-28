import { useState } from "react";
import "../styles/Register.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", formData);
      if (res.data) {
        alert(res.data.message)
        navigate("/login");
      } else {
        alert(res.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register">
      <h2>Register</h2>
      <form className="form-register" onSubmit={handleSubmit}>
        <input
          className="input-field"
          type="text"
          placeholder="Enter Username"
          name="username"
          onChange={handleChange}
        />
        <input
          className="input-field"
          type="email"
          placeholder="Enter Email"
          name="email"
          onChange={handleChange}
        />
        <input
          className="input-field"
          type="password"
          placeholder="Enter Password"
          name="password"
          onChange={handleChange}
        />
        <button className="input-button" type="submit">
          REGISTER
        </button>
      </form>
      <div className="form-bottom">
        <p className="para-line">Already have an account ? </p>
        <Link to="/login" className="link-login links">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
