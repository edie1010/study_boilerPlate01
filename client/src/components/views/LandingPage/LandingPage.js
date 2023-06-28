import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/hello")
      .then((response) => console.log("TEST"));
  }, []);

  const onClickHandler = () => {
    axios.get("http://localhost:5000/api/users/logout").then((response) => {
      if (response.data.success) {
        console.log(response);
        navigate("/login");
      } else {
        alert("로그아웃하는데 실패했음..");
      }
    });
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
      <h2>시작페이지</h2>
      <button onClick={onClickHandler}>로그아웃</button>
    </div>
  );
}

export default LandingPage;
