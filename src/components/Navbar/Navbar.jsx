import React, { useContext } from "react";
import img from '../../assets/images/freshcart-logo.svg';
import { NavLink, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import styles from "./Navbar.module.css"; 

export default function Navbar() {
    let navigate = useNavigate();
    let { isLogin, setLogin } = useContext(userContext);
    let { cartNumber } = useContext(CartContext);

    function logOut() {
        localStorage.removeItem('userToken');
        setLogin(null);
        navigate('/login');
    }

    return (
        <nav className={`navbar navbar-expand-lg sticky-top shadow-sm ${styles.customNav}`}>
            <div className="container">
       
                <NavLink className="navbar-brand" to="/">
                    <img src={img} width='160' alt='logo' />
                </NavLink>

          
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
       
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
                        {isLogin && (
                            <>
                                <li className="nav-item">
                                    <NavLink to={''} className={({isActive}) => isActive ? styles.activeLink : styles.navLink}>Products</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to={'brands'} className={({isActive}) => isActive ? styles.activeLink : styles.navLink}>Brands</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to={'carts'} className={`${styles.navLink} position-relative`}>
                                        <i className="fa-solid fa-cart-shopping me-1"></i>
                                        Cart
                                        {cartNumber > 0 && (
                                            <span className={styles.cartBadge}>{cartNumber}</span>
                                        )}
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>

                    <div className="d-flex align-items-center flex-column flex-lg-row">
                        <ul className="navbar-nav align-items-center">
                            {!isLogin ? (
                                <>
                                    <li className="nav-item">
                                        <NavLink to={'Login'} className={styles.authLink}>Login</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to={'Register'} className={styles.registerBtn}>Register</NavLink>
                                    </li>
                                </>
                            ) : (
                                <li className="nav-item">
                                    <span className={styles.logoutBtn} onClick={logOut}>
                                        <i className="fa-solid fa-right-from-bracket me-2"></i>
                                        Logout
                                    </span>
                                </li>
                            )}
                        </ul>

                        <div className={`${styles.socialIcons} ms-lg-3 d-none d-lg-flex`}>
                            <i className='fab fa-facebook'></i>
                            <i className='fab fa-instagram'></i>
                            <i className='fab fa-youtube'></i>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}