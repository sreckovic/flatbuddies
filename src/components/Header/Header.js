import React from "react";
import { Link, NavLink } from "react-router-dom";

import "./Header.css";

const header = () => {
  return (
    <header className="header">
      <div className="container">
        <h1>
          <Link to={"/"}>FlatBuddies.co</Link>
        </h1>
        <h2>Share accommodation website.</h2>

        <nav className="navbar" aria-label="main navigation">
          <div className="navbar-menu is-active">
            <ul>
              <li>
                <NavLink
                  to="/rooms/"
                  exact
                  // activeClassName="my-active"
                  // activeStyle={{ color: "#fa923f", textDecoration: "underline" }}
                >
                  Rooms
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: "/add-listing"
                    //hash: "#submit",
                    //search: "?quick-submit=true"
                  }}
                >
                  List my place
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default header;
