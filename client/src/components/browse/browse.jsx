import React from "react";
import {useEffect} from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "./browse.sass";

export default function Browse() {
  const navigate = useNavigate();
  const [list, setList] = React.useState([]);
  const [send] = React.useState({
    author: '',
    sub: ''
  });

  const fetchAllSubs = async () => {
    try {
      const res = await axios.get("http://localhost:8800/");
      setList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllSubs();
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      send.author = localStorage.getItem("FlowtrackToken");
      send.sub = e.target.name
      await axios.post("http://localhost:8800/addsub", send);
      navigate("/library");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="browse">
      <h1>Join our community!</h1>
      <div className="browse_list">
        {
          React.Children.toArray(
          list.length ? list.map((list) => (
            <button id="" className="browse_btn">
              <div className="browse_img">
                <img src={list.Photo} alt="logo" />
              </div>
              <div className="browse_name">{list.Name}</div>
              <div className="browse_genre">{list.Genre}</div>
              <div className="browse_desc">{list.Description}</div>
              <div className="browse_price">
                <s className="browse_price_off">{list.Official}€ </s>
                {list.Our}€
              </div>
              <Button name={list.Name} variant="light" onClick={handleClick}>
                Subscribe
              </Button>
            </button>
          )):<div> sorry - there is no list items...</div>
          )
        }
      </div>
    </div>
  );
}
