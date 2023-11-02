import React from "react";
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
            url="/library"
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
        <Form.Select size="sm">
          <option disabled selected value>
            {" "}
          </option>
          <option>Latvia</option>
          <option>Estonia</option>
          <option>Lithuania</option>
        </Form.Select>
        {/* {user ? ( 
          <div>
            <Link to="/login">
              <button className="header_btn_select">
                <img className="header_avatar" src="https://lh3.googleusercontent.com/a/ACg8ocKmhnCqtKTCOWELBYZNBVau1rmw7L5RRpEOk0gvP70J82E=s288-c-no" alt="frammy avatar" />
                frammy
              </button>
            </Link>
            <WrappedLink
              url="/login"
              buttonClass="header_btn_select"
              buttonTitle="Log out"
            />
          </div>
         ) : ( */}
          <WrappedLink
            url="/login"
            buttonClass="header_btn_select"
            buttonTitle="Sign in"
          />
        {/* )} */}
      </div>
    </header>
  );
}
