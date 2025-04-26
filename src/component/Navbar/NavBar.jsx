import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "/src/component/NavBar/navbar.module.css";
import { deleteToken } from "../../Redux/FormReducer";
import { useSelector, useDispatch } from "react-redux";
const Navbar = () => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.formReducer.token)
  const handleLogout = () => {
    dispatch(deleteToken())
  }
  return (
    <div className={styles.navbar}>
      <div className={styles.navbtn}>
        {token ? <Link className={styles.link} to="/">
          <button onClick={handleLogout} className={styles.btn}>Logout </button>
        </Link> :
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
