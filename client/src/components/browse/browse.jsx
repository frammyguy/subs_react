import React from "react";
import axios from "axios";
import "./browse.sass";
import {useEffect} from "react";

export default function Browse() {
  const [list, setList] = React.useState([]);

  //better not to declare function in useEffect
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
  }, [fetchAllSubs]);

  return (
    <div className="browse">
      <h1>Join our community!</h1>
      <div className="browse_list">
        {
          //should work without React.Children.toArray()
          // list.length > 0 - if yes, then render, no - return placeholder
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
            </button>
            )
          ):<div> sorry - there is no list items...</div>
        }
      </div>
    </div>
  );
}
