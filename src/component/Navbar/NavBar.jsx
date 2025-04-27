import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "/src/component/NavBar/navbar.module.css";


const Navbar = () => {
  const [token, setToken] = useState(null);
  const location = useLocation();
  const role = localStorage.getItem('role')

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, [location]);


  const handleLogout = () => {
    localStorage.clear()
    setToken(null)
  };
  return (
    <div className={styles.navbar}>
      <div className={styles.navbtn}>
        {token ?
          <>
            {(role === "teacher" ? <Link className={styles.link} to="/create-exam">
              <button className={styles.btn}> Create+ </button>
            </Link> : null)}
            <Link className={styles.link} to="/">
              <button onClick={handleLogout} className={styles.btn}>Logout </button>
            </Link>
          </>


          :
          <>
            <Link className={styles.link} to="/">
              <button className={styles.btn}>Login </button>
            </Link>
            <Link className={styles.link} to="/register">
              <button className={styles.btn}> Register </button>
            </Link>
          </>
        }


      </div>
    </div>

  )
}

export default Navbar;
