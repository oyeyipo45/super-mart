import React from "react";
import { Route, Link } from "react-router-dom";

const Header = () => {
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };

  return (
    <div className="header-container">
      <header className="header">
        <div className="sidebar">
          <div className="brand">
            <button className="add" onClick={closeMenu}>
              &#9776;
            </button>
          </div>
          <aside className="header-shopping-list">
            <h3 className="header-shopping-list-heading">CATEGORIES</h3>
            {/* <button className="sidebar-close-button remove" onClick={closeMenu}>
                x
              </button> */}
            <div>
              <ul className="landing-shopping-list">
                <li className="sidebar-list">
                  <a href="index.html">Pants</a>
                  <a href="index.html">
                    <img src="https://img.icons8.com/ios-glyphs/20/000000/chevron-right.png" />
                  </a>
                </li>

                <li className="sidebar-list">
                  <a href="index.html">Pants</a>
                  <a href="index.html">
                    {" "}
                    <img src="https://img.icons8.com/ios-glyphs/20/000000/chevron-right.png" />{" "}
                  </a>
                </li>
                <li className="sidebar-list">
                  <a href="index.html">Pants gdgdfbfgfgfd</a>
                  <a href="index.html">
                    {" "}
                    <img src="https://img.icons8.com/ios-glyphs/20/000000/chevron-right.png" />{" "}
                  </a>
                </li>
                <li className="sidebar-list">
                  <a href="index.html">Pantsdfdfd</a>
                  <a href="index.html">
                    {" "}
                    <img src="https://img.icons8.com/ios-glyphs/20/000000/chevron-right.png" />{" "}
                  </a>
                </li>
                <li className="sidebar-list">
                  <a href="index.html">Pants gfvf</a>
                  <a href="index.html">
                    {" "}
                    <img src="https://img.icons8.com/ios-glyphs/20/000000/chevron-right.png" />{" "}
                  </a>
                </li>
                <li className="sidebar-list">
                  <a href="index.html">Pants dfdfdfdfdfd</a>
                  <a href="index.html">
                    {" "}
                    <img src="https://img.icons8.com/ios-glyphs/20/000000/chevron-right.png" />{" "}
                  </a>
                </li>
                <li className="sidebar-list">
                  <a href="index.html">Pants</a>
                  <a href="index.html">
                    {" "}
                    <img src="https://img.icons8.com/ios-glyphs/20/000000/chevron-right.png" />{" "}
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>

        <div className="header-wrapper">
          <div className="brand">
            <button className="add" onClick={openMenu}>
              &#9776;
            </button>
          </div>
          <div className="brand-name">
            <Link to="/">
              <h1>LOLAINE</h1>
            </Link>
          </div>
          <div className="header-links">
            <Link to="/cart" className="cart-button"> Cart</Link>
            <Link to="/signin" className="cart-button">Sign in</Link>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
