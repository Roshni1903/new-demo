import React from "react";
import { Link} from "react-router-dom";
import styles from "/src/component/NavBar/navbar.module.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const token = localStorage.getItem("token");
  return (
    <div className={styles.navbar}>
      {token ? null : (
        <>
          <Link className={styles.link} to="/">
            <button className={styles.btn}>Login </button>
          </Link>
          <Link className={styles.link} to="/register">
            <button className={styles.btn}> Register </button>
          </Link>
        </>
      )}

      {token ? (
        <>
         
            <button onClick={handleLogout} className={styles.btn}>
              Logout
            </button>
         
          <Link className={styles.link} to="/dashboard/profile">
            <button className={styles.btn}>Profile</button>
          </Link>
        </>
      ) : null}
    </div>
  );
};

export default Navbar;
