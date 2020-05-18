import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const { email, password } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch(
        "http://localhost:5000/authentication/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );

      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
        toast.success("Logged in Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="mt-5 text-center display-3">LOGIN</h1>
      <div className="d-flex justify-content-center">
      <form onSubmit={onSubmitForm} style={{width:"50%"}}>
        <input
          type="text"
          name="email"
          value={email}
          onChange={e => onChange(e)}
          placeholder="Email"
          className="form-control my-3"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={e => onChange(e)}
          placeholder="Password"
          className="form-control my-3"
        />
        <button className="btn btn-warning btn-block">Submit</button>
        <Link to="/register">New User?Register</Link>
      </form>
      </div>
      
    
    </Fragment>
  );
};

export default Login;
