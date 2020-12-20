import React, { useEffect, useState } from "react";
import axios from "axios";

function UserApi(token) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get("/api/users/info", {
            headers: { Authorization: token },
          });
          setIsLoggedIn(true);
          setUser(res.data);
          if (res.data.role === 1) setIsAdmin(true);
        } catch (err) {
          alert(err.response.data.error);
        }
      };
      getUser();
    }
  }, [token]);

  return {
    isLoggedIn: [isLoggedIn, setIsLoggedIn],
    isAdmin: [isAdmin, setIsAdmin],
    user: [user, setUser],
  };
}

export default UserApi;
