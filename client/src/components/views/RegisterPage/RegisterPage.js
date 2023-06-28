import axios, { Axios } from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../../_action/user_action";

function RegisterPage(props) {
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPassWorldHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onNamedHandler = (event) => {
    setName(event.currentTarget.value);
  };
  const onConfrimPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert("비밀번호 확인은 같아야합니다.");
    }

    let body = {
      email: Email,
      password: Password,
      name: Name,
    };

    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        navigate("/login");
      } else {
        alert("Fail to sign up");
      }
    });

    // Axios.post("http://localhost:5000/api/users/login", body).then(
    //   (response) => {}
    // );
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler}></input>
        <label>Name</label>
        <input type="text" value={Name} onChange={onNamedHandler}></input>

        <label>Pasword</label>
        <input
          type="password"
          value={Password}
          onChange={onPassWorldHandler}
        ></input>
        <label>confirm Password</label>
        <input
          type="password"
          value={ConfirmPassword}
          onChange={onConfrimPasswordHandler}
        ></input>
        <br />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default RegisterPage;
