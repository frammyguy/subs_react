import React, {useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import "./header.sass";

const WrappedLink = ({ url, linkClass = "", buttonClass, buttonTitle }) => {
  return (
    <Link className={linkClass} to={url}>
      <button className={buttonClass}>{buttonTitle}</button>
    </Link>
  );
};

export default function Header() {
  const [user, setUser] = React.useState({
    token: localStorage.getItem('FlowtrackToken')
  });
  const [list, setList] = React.useState([]);

  const fetchtheName = async () => {
    try {
      const res = await axios.post("http://localhost:8800/header", user);
      setList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchtheName();
  }, []);
  return (
    <header className="split">
      <div className="header">
        <WrappedLink
          url="/"
          linkClass="header_logo_link"
          buttonClass="header_logo"
          buttonTitle="FLOWTRACK"
        />
        <div className="header_btn">
          <WrappedLink
            url="/"
            buttonClass="header_btn_select"
            buttonTitle="Browse"
          />
          <WrappedLink
            url={list.token !== 'no token' ? "/library" : "/login"}
            buttonClass="header_btn_select"
            buttonTitle="My subs"
          />
          <WrappedLink
            url="/about"
            buttonClass="header_btn_select"
            buttonTitle="About"
          />
        </div>
      </div>
      <div className="logins">
        <Form.Select defaultValue={'DEFAULT'} size="sm">
          <option value="DEFAULT" hidden>
            {" "}
          </option>
          <option>Latvia</option>
          <option>Estonia</option>
          <option>Lithuania</option>
        </Form.Select>
        {list.token !== 'no token' ? ( 
          <div>
            <Link to="/library">
              {list.length ? 
              <button className="header_btn_select">
                {list[0].photo ? <img className="header_avatar" src={list[0].photo} alt="." /> : null}
                {list[0].username}
              </button> : null}
            </Link>
            <WrappedLink
              url="/logout"
              buttonClass="header_btn_select"
              buttonTitle="Log out"
            />
          </div>
         ) : (
          <WrappedLink
            url="/login"
            buttonClass="header_btn_select"
            buttonTitle="Sign in"
          />
        )}
      </div>
    </header>
  );
}
