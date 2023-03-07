import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";
import { selectCartItems } from "../cart/CartSlice";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

  // calculate cart quantity
  const cartItems = useSelector(selectCartItems);
  let cartTotal = 0;
  if (cartItems.length > 0) {
    for (const item of cartItems) {
      cartTotal += item.quantity;
    }
  }

  return (
    <div className="navbar">
      <h1 className="logo">Grace Shopper Team ZJC</h1>
      <nav className="nav">
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link className="nav-link" to="/home">
              Home
            </Link>
            <Link className="nav-link" to="/products">
              All Products
            </Link>
            <Link className="nav-link" to="/cart">
              Cart ({cartTotal})
            </Link>
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link className="nav-link" to="/login">
              Login
            </Link>
            <Link className="nav-link" to="/signup">
              Sign Up
            </Link>
            <Link className="nav-link" to="/products">
              All Products
            </Link>
            <Link className="nav-link" to="/cart">
              Cart ({cartTotal})
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
