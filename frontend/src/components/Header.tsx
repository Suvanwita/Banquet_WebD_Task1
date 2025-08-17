import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Header.css";

export default function Header() {
  const auth = useContext(AuthContext);

  return (
    <header className="header">
      <h1>Banquet</h1>
      <nav>
        {auth?.user ? (
          <>
            <span>Hi, {auth.user.email}</span>
            <button
              onClick={auth.logout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="link">
              Login
            </Link>
            <Link to="/register" className="link">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
