import logo from "../images/logo.png";
import React, { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import { baseURL } from "../../Shared/BaseURL";
import { Redirect } from "react-router-dom";
import SuccessModal from "../../Common/SuccessModal";
import UnsuccessModal from "../../Common/UnsuccessModal";

function Loginn(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState("");
  const [unsuccess, setUnsuccess] = useState("");
  const [loading, setLoading] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onLogin = (e) => {
    e.preventDefault();

    if (username === "" && password === "") {
      setStatus("Username and Password cannot be empty");
    } else if (username === "" && password !== "") {
      setStatus("Password cannot be empty");
    } else if (password === "" && username !== "") {
      setStatus("Username cannot be empty");
    } else {
      login(e);
    }
  };

  const login = async (e) => {
    var bodyFormData = new FormData();
    bodyFormData.append("username", username);
    bodyFormData.append("password", password);
    console.log(bodyFormData);
    setLoading(true);
    await fetch(`${baseURL}/login.php`, {
      body: bodyFormData,
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success === true) {
          localStorage.setItem("token", JSON.stringify(res.token));
          const token = localStorage.getItem("token");
          if (token !== null) {
            props.onLoggedIn();
            setLoading(false);
            setSuccess(true);
            setUsername("");
            setPassword("");
            setTimeout(() => {
              setSuccess(false);
              setIsLoggedIn(true);
            }, 2000);
          }
        } else {
          setLoading(false);
          setUnsuccess(true);
          setTimeout(() => {
            setUnsuccess(false);
          }, 2000);
        }
      })
      .catch((e) => {
        setLoading(false);
        setUnsuccess(true);
        setTimeout(() => {
          setUnsuccess(false);
        }, 2000);
        console.log(e);
      });
  };

  // localhost/clothingStore/order/updateOrder.php

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }
  return (
    <div
      style={{ backgroundColor: "#ebebec", height: "100vh", width: "100vw" }}
      className="d-flex justify-content-center  align-items-center "
    >
      <div>
        <form
          onSubmit={onLogin}
          className="container body-form d-flex flex-column  shadow p-5 "
          style={{
            backgroundColor: "white",
            height: 400,
            width: 450,
            borderRadius: 10,
          }}
        >
          <div className="d-flex justify-content-center  align-items-center ">
            <img
              src={logo}
              className="mb-5"
              style={{ height: 50, width: 165 }}
              alt="..."
            />
          </div>

          <div class="input-group mb-2 ps-3 pe-3">
            <input
              type="text"
              class="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <div class="input-group-append">
              <div class="input-group-text">
                <span>
                  <FaIcons.FaUserAlt size={15} />
                </span>
              </div>
            </div>
          </div>
          <div class="input-group  p-3">
            <input
              type="password"
              class="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div class="input-group-append">
              <div class="input-group-text">
                <span>
                  <FaIcons.FaLock size={15} />
                </span>
              </div>
            </div>
          </div>
          <div>
            <p className="text-danger text-center" style={{ fontSize: 15 }}>
              {status}
            </p>
          </div>
          <div className="d-flex justify-content-center  align-items-center ">
            <button
              type="submit"
              className="btn btn-secondary btn-block mt-2 mb-4"
              style={{ height: 35, width: 90, backgroundColor: "black" }}
            >
              Login
            </button>
          </div>
          {/* <div>
                    <input type="text" style={{ width: 300 }} className="form-control" placeholder="Password" />
                </div> */}
        </form>
      </div>
      <SuccessModal open={success} />
      <UnsuccessModal open={unsuccess} />
    </div>
  );
}
export default Loginn;
