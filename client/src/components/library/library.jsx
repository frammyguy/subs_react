import React, {useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./library.sass";

function NotEmpty({service, description, price, arr, blurElement}) {
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

//all components with capital
//writing component in another component - huitaa, vinesi komponent otdelno, i peredaj props
function ShowSubs({list, handleDelete, blurElement}) {
  //hz why u need React.Children.toArray, but mb it's needed
  // length check should be before component is rendered
  return React.Children.toArray(
      list[0].map((e) => (
          <div className="list_btn">
            <div className="list_btn_box" hidden="hidden">
              <Button
                  variant="danger"
                  onClick={() => handleDelete(e.ID)}
                  className="activeButtons"
              >
                Delete
              </Button>{" "}
              <Link to={`/update/${e.ID}`} className="activeButtons">
                <Button variant="warning" className="btn btn-warning">
                  Update
                </Button>
              </Link>
            </div>
            {list[1].map((arr) => {
              if (arr.Name === e.Service)
                  //kakoj nahuj funkcija piwi JSX
                return  <NotEmpty
                          service={e.Service}
                          description={e.Description}
                          price={e.Price} arr={arr}
                          blurElement={blurElement}
                        />
              return null;
            })}
          </div>
      ))
  );
}

export default function Library() {
  const [list, setList] = React.useState([]);
  const fetchAllSubs = async () => {
    try {
      const res = await axios.get("http://localhost:8800/library");
      setList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllSubs();
  }, []);

  //dom manipulations in react are not good practice
  //need to use references and events to change the classnames and attributes
  function blurElement(props) {
    props = props.currentTarget;
    const hidden = props.parentElement.children[0].hidden === "hidden";
    //za var otrezhu pisku, uzaj const kak mozhno chawe
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
      await axios.delete("http://localhost:8800/library/" + id);
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
      {/* {list.Author && } */}
      {
        //length check before rendering component
        //DO NOT render component as the function(), need to use jsx elements: <ShowSubs/> instead of showSubs()
        list.length ? <ShowSubs list={list}
                                handleDelete={handleDelete}
                                blurElement={blurElement}/> : null
      }
    </div>
  );
}
