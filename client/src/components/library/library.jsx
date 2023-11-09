import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./library.sass";

const pepe = [
  "https://www.candlepowerforums.com/media/pepe-hype-png.1887/full",
  "https://www.candlepowerforums.com/media/pepehands-png.1888/full",
  "https://media.tenor.com/s0x8wn5QX7wAAAAj/pepe.gif",
  "https://www.candlepowerforums.com/media/pepelaugh-png.1889/full",
  "https://www.candlepowerforums.com/media/rarepepe-png.2092/full",
  "https://www.candlepowerforums.com/media/pepe-cheers-png.1886/full",
  "https://www.candlepowerforums.com/media/monkas-png.1885/full",
  "https://www.candlepowerforums.com/media/hmmm-png.1884/full",
  "https://www.candlepowerforums.com/media/feelsbadman-png.1883/full",
  "https://www.candlepowerforums.com/media/ez-png.1882/full",
  "https://www.candlepowerforums.com/media/cool-png.1881/full",
  "https://www.candlepowerforums.com/media/3x-gif.1880/full",
];
function NotEmpty({
  service,
  description,
  price,
  logo,
  date,
  arr,
  blurElement,
}) {
  date = new Date(date);
  date = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  return (
    <button id="" onClick={blurElement} className="list_sub">
      <div className="list_excPrice">
        {logo ? (
          <img src={logo} alt="logo" />
        ) : arr.Photo ? (
          <img src={arr.Photo} alt="logo" />
        ) : (
          <img src={pepe[Math.floor(Math.random() * pepe.length)]} alt="logo" />
        )}

        <div className="list_sub_title">
          <div className="list_sub_name">{service}</div>
          <div className="list_sub_genre">{arr.Genre}</div>
        </div>
        <div className="list_sub_sub">
          <div className="list_sub_desc">{description}</div>
        </div>
      </div>
      <div className="list_sub_time">{date}</div>
      <div className="list_sub_price">{price}€</div>
    </button>
  );
}

function ShowSubs({ list, handleDelete, blurElement }) {
  return React.Children.toArray(
    list[0].map((e) => (
      <div className="list_btn">
        <div className="list_btn_box" hidden="hidden">
          <Link to={`/update/${e.ID}`} className="activeButtons">
            <Button variant="warning" className="btn btn-warning">
              Update
            </Button>
          </Link>{" "}
          <Button
            variant="danger"
            onClick={() => handleDelete(e.ID)}
            className="activeButtons"
          >
            Delete
          </Button>
        </div>
        {React.Children.toArray(
          list[1].map((arr) => {
            if (arr.Name === e.Service) {
              return (
                <NotEmpty
                  service={e.Service}
                  description={
                    e.Description !== "" ? e.Description : arr.Description
                  }
                  price={e.Price !== 0 ? e.Price : arr.Our}
                  logo={
                    e.Custom_logo === ""
                      ? e.Custom_logo
                      : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fthenounproject.com%2Ficon%2Fdot-658609%2F&psig=AOvVaw3bmZFlMqvNGDu7R3WuzTTI&ust=1699573039094000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPiYsovJtYIDFQAAAAAdAAAAABAE"
                  }
                  date={e.Date}
                  arr={arr}
                  blurElement={blurElement}
                />
              );
            }
            return null;
          })
        )}
      </div>
    ))
  );
}

export default function Library() {
  const [user] = React.useState({
    token: localStorage.getItem("FlowtrackToken"),
  });

  const [list, setList] = React.useState([]);
  const fetchAllSubs = async () => {
    try {
      const res = await axios.post("http://localhost:8800/library", user);
      setList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllSubs();
  }, []);

  function blurElement(props) {
    props = props.currentTarget;
    const hidden = props.parentElement.children[0].hidden === "hidden";
    let elems = Array.from(document.getElementsByClassName("list_sub"));
    elems.forEach((element) => {
      element.id = "";
      if (!element.classList.contains("list_add")) {
        element.parentElement.children[0].setAttribute("hidden", "hidden");
      }
    });
    if (props.id !== "marked") props.id = "marked";
    if (!hidden) props.parentElement.children[0].removeAttribute("hidden");
    else props.parentElement.children[0].setAttribute("hidden", "hidden");
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/delete/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="list">
      {list.length ? (
        <ShowSubs
          list={list}
          handleDelete={handleDelete}
          blurElement={blurElement}
        />
      ) : null}
      <Link to="/add">
        <button id="" className="list_sub list_add">
          Add a new field
        </button>
      </Link>
    </div>
  );
}
