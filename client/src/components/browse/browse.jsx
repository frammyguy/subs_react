import React from "react";
import axios from "axios";
import "./browse.sass";

export default function Browse() {
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    const fetchAllSubs = async () => {
      try {
        const res = await axios.get("http://localhost:8800/");
        setList(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllSubs();
  }, []);

  return (
    <div className="browse">
      <h1>Join our community!</h1>
      <div className="browse_list">
        {React.Children.toArray(
          list.map((list) => (
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
            </button>
          ))
        )}
      </div>
    </div>
  );
}
