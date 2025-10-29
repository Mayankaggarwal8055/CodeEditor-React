import { NavLink } from "react-router-dom";
import styles from "./navbar.module.css";

const Navbar = ({ userData }) => {
  const isLoggedIn = Boolean(userData && userData.id);

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.navBrand}>
        Code Mirror
      </NavLink>

      <div className={styles.navLinks}>
        {isLoggedIn ? (
          <span className={styles.navLink} title={userData.email}>
            {userData.name || "User"}
          </span>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            login
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
