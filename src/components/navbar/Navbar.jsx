import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="main-nav">
      <h2 className="heading">Grace Shopper Team ZJC</h2>
      <div>
        <Link to="/products">All Products</Link>
      </div>
    </div>
  );
};

export default Navbar;
