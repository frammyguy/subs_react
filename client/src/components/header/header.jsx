import React from "react";
import { Link } from "react-router-dom";
import "./header.sass";

export default function Header() {
  return (
    <header className="split">
      <div className="header">
        <Link className="header_logo_link" to='/'>
          <div className="header_logo">FLOWTRACK</div>
        </Link>
        <div className="header_btn">
          <Link to='/'>
            <button className="header_btn_select">Browse</button>
          </Link>
          <Link to={'/library'}>
            <button className="header_btn_select">My subs</button>
          </Link>
          <Link to={'/about'}>
            <button className="header_btn_select">About</button>
          </Link>
        </div>
      </div>
      <div className="logins">
        <Link to={'/login'}>
          <button className="header_btn_select">Sign in</button>
        </Link>
        <Link to={'/register'}>
          <button className="header_btn_select">Sign up</button>
        </Link>
      </div>
    </header>
  );
}
