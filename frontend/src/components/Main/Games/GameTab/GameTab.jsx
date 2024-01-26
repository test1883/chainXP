import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../../assets/address.jpg";

const GameTab = () => {
  return (
    <aside id="sidebar" className={`sidebar ${"ml-[300px]"}`}>
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-heading">Game</li>
        <li className="nav-item">
          <Link className="nav-link gap-1 collapsed" to="/">
            <img
              src={logo}
              alt=""
              className=""
              style={{ height: "50px", width: "50px", borderRadius: "50%" }}
            />
            <span> Game 1: The gamified</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link gap-1 collapsed" to="/">
            <img
              src={logo}
              alt=""
              className=""
              style={{ height: "50px", width: "50px", borderRadius: "50%" }}
            />
            <span> Game 1: The gamified</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link gap-1 collapsed" to="/">
            <img
              src={logo}
              alt=""
              className=""
              style={{ height: "50px", width: "50px", borderRadius: "50%" }}
            />
            <span> Game 1: The gamified</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link gap-1 collapsed" to="/">
            <img
              src={logo}
              alt=""
              className=""
              style={{ height: "50px", width: "50px", borderRadius: "50%" }}
            />
            <span> Game 1: The gamified</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link gap-1 collapsed" to="/">
            <img
              src={logo}
              alt=""
              className=""
              style={{ height: "50px", width: "50px", borderRadius: "50%" }}
            />
            <span> Game 1: The gamified</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link gap-1 collapsed" to="/">
            <img
              src={logo}
              alt=""
              className=""
              style={{ height: "50px", width: "50px", borderRadius: "50%" }}
            />
            <span> Game 1: The gamified</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link gap-1 collapsed" to="/">
            <img
              src={logo}
              alt=""
              className=""
              style={{ height: "50px", width: "50px", borderRadius: "50%" }}
            />
            <span> Game 1: The gamified</span>
          </Link>
        </li>
      </ul>
    </aside>
    // End Sidebar
  );
};

export default GameTab;
