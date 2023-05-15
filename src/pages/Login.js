import React, { useState } from "react";
import userLogin from "../assets/login/userLogin.png";
import "./login.css";
import axios from "axios";
import altorLogo from "../assets/login/altorLogo.svg";
import { useNavigate } from "react-router-dom";

function Login() {
  const [authMood, setAuthMood] = useState(null);
  const [authIn, setAuthIn] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let authEndPoint = "";
    let role = "";
    if (authMood == "admin") {
      role = "admin";
      if (authIn) {
        authEndPoint = "http://20.121.141.248:5000/admin/signup";
      } else {
        authEndPoint = "http://20.121.141.248:5000/admin/login";
      }
    } else {
      role = "operator";
      if (authIn) {
        authEndPoint = "http://20.121.141.248:5000/operator/signup";
      } else {
        authEndPoint = "http://20.121.141.248:5000/operator/login";
      }
    }
    const dataForReq = new FormData();
    dataForReq.append("email", formData.email);
    dataForReq.append("password", formData.password);
    dataForReq.append("role", role);
    try {
      const {data} = await axios.post(authEndPoint, dataForReq);
      console.log(data);
      if(authIn){
        navigate('/login')
        setAuthIn(false)
      }
      else {
        sessionStorage.setItem('role', role);
        sessionStorage.setItem('token', data.response.token);        
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (authMood == null) {
    return (
      <div className="flex flex-col gap-8  justify-center items-center text-[1.5rem] font-semibold text-white h-screen">
        <button
          className="bg-[#413a86] p-[1.2rem]  rounded-[17px]"
          onClick={() => setAuthMood("admin")}
        >
          Login/Register As Admin?.. Click here..
        </button>
        <button
          className="bg-[#358f46] p-[1.2rem] rounded-[17px]"
          onClick={() => setAuthMood("operator")}
        >
          Login/Register As Operator?..Click here..
        </button>
      </div>
    );
  } else {
    return (
      <div className="grid grid-cols-12 h-screen">
        <div className="login-container col-span-6">
          <h1 className="text-[2rem] text-[#03C7FF]">
            {`${authMood} ${authIn ? "SignUp" : "Login"}`}
          </h1>
          <img className="login-pic" src={altorLogo} alt="User Icon" />
          <div className="contact-form">
            <div className="signin">
              <form>
                <input
                  type="text"
                  className="user"
                  placeholder="enter email Id"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <input
                  type="password"
                  className="pass"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Enter password"
                />
                <p className="self-end">
                  <a className="text-[#03C7FF]" href="#">
                    Forgot Password?
                  </a>
                </p>
                <button
                  className="btn-login"
                  type="submit"
                  value="Login"
                  onClick={handleSubmit}
                >
                  {authIn ? "Sign Up":"Login"}
                </button>
              </form>
            </div>
          </div>{" "}
          <button
            type="button"
            className="text-[#03C7FF] border-b-2"
            onClick={() => setAuthIn((prev) => !prev)}
          >
            {authIn ? "Switch to Login" : "Switch to signUp"}
          </button>
        </div>
        <div className="border-l-2 bg-[#FAFAFA]"></div>
      </div>
    );
  }
}

export default Login;
