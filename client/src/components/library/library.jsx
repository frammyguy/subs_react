import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./library.sass";

function NotEmpty({ service, description, price, arr, blurElement }) {
  return (
    <button id="" onClick={blurElement} className="list_sub">
      <div className="list_excPrice">
        <img src={arr.Photo} alt="logo" />
        <div className="list_sub_title">
          <div className="list_sub_name">{service}</div>
          <div className="list_sub_genre">{arr.Genre}</div>
        </div>
        <div className="list_sub_sub">
          <div className="list_sub_desc">{description}</div>
        </div>
      </div>
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
              // need to make that element which matched deletes,
              // so at the end we've got non marked and sort them by ourselves
              return (
                <NotEmpty
                  service={e.Service}
                  description={e.Description}
                  price={e.Price}
                  arr={arr}
                  blurElement={blurElement}
                />
              );
            } else console.log(arr, e);
            return null;
          })
        )}
      </div>
    ))
  );
}

export default function Library() {
  const [user, setUser] = React.useState({
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
      <Link to="/add">
        <button id="" className="list_sub list_add">
          Add a new field
        </button>
      </Link>
      {list.length ? (
        <ShowSubs
          list={list}
          handleDelete={handleDelete}
          blurElement={blurElement}
        />
      ) : null}
    </div>
  );
}
