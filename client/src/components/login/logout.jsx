import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate();
  const dologout = async () => {
    try {
      if (localStorage.getItem("FlowtrackToken"))
        localStorage.removeItem("FlowtrackToken");
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    dologout();
  }, []);
}
