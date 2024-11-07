import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="p-4 text-bg-dark">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <a href="/solution" className="navbar-brand">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="200"
              height="60"
              viewBox="0 0 200 60"
            >
              <path
                d="M20 20 L30 15 L40 20 L40 35 L30 40 L20 35 Z"
                fill="#6b8e23"
                stroke="#000"
                strokeWidth="1"
              />
              <path
                d="M40 20 L50 15 L60 20 L60 35 L50 40 L40 35 Z"
                fill="#6b8e23"
                stroke="#000"
                strokeWidth="1"
              />
              <path d="M30 15 L50 15" stroke="#000" strokeWidth="1" />
              <circle cx="50" cy="40" r="10" stroke="#000" strokeWidth="2" fill="none" />
              <line x1="55" y1="45" x2="65" y2="55" stroke="#000" strokeWidth="2" />
              <text
                color="white"
                x="80"
                y="35"
                fontFamily="Arial, sans-serif"
                fontSize="20"
                fill="#ffffff"
              >
                eBook App
              </text>
            </svg>
          </a>

          {/* Toggle Button for smaller screens */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link px-2 text-secondary">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/add-book" className="nav-link px-2 text-white">
                  Add BOOK
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link px-2 text-white">
                  About
                </Link>
              </li>
            </ul>

            <form action="/submit" method="POST" className="d-flex">
              <input
                type="text"
                name="fName"
                className="form-control me-2"
                placeholder="Search a Book"
                aria-label="Search a Book"
              />
              <button className="btn btn-outline-secondary" type="submit">
                Search
              </button>
            </form>

            {/* Logout and Signup buttons in a single line */}
            <div className="d-flex mt-3 mt-lg-0">
              <Link to="/">
                <button type="button" className="btn btn-outline-light me-2 ms-3">
                  Log out
                </button>
              </Link>
              <Link to="/register">
                <button type="button" className="btn btn-warning">
                  Sign-up
                </button>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
