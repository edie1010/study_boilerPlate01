import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_action/user_action";
import { useNavigate } from "react-router-dom";

export default function (SpecificComponent, option, adminRout = null) {
  function AuthenticationCheck(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(auth()).then((response) => {
        console.log(response);

        //로그인하지않은상태
        if (!response.payload.isAuth) {
          if (option) {
            navigate("/login");
          }
        } else {
          //로그인한상태
          if (adminRout && !response.payload.isAdmin) {
            navigate("/");
          } else {
            if (option === false) {
              navigate("/");
            }
          }
        }
      });
    }, []);

    return <SpecificComponent />;
  }

  return AuthenticationCheck;
}
