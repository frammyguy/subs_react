import React from "react";
import { Link } from "react-router-dom";
import "./header.sass";

//better to wrap this into one component, because <Link><button></button></Link> structure is used every time, and
//better not to repeat it
const WrappedLink = ({url, linkClass = '', buttonClass, buttonTitle }) => {
  //if linkClass is provided, then it will have the class, if no - empty string
  return <Link className={linkClass} to={url}>
    <button className={buttonClass}>{buttonTitle}</button>
  </Link>
}

export default function Header() {
  return (
    <header className="split">
      <div className="header">
        <WrappedLink
            url='/'
            linkClass='header_logo_link'
            buttonClass='header_logo'
            buttonTitle='FLOWTRACK'
        />
        <div className="header_btn">
          <WrappedLink
              url='/library'
              buttonClass='header_btn_select'
              buttonTitle='Browse'
          />
          <WrappedLink
              url='/library'
              buttonClass='header_btn_select'
              buttonTitle='My subs'
          />
          <WrappedLink
              url='/about'
              buttonClass='header_btn_select'
              buttonTitle='About'
          />
        </div>
      </div>
      <div className="logins">
        <WrappedLink
            url='/login'
            buttonClass='header_btn_select'
            buttonTitle='Sign in'
        />
        <WrappedLink
            url='/register'
            buttonClass='header_btn_select'
            buttonTitle='Sign up'
        />
      </div>
    </header>
  );
}
