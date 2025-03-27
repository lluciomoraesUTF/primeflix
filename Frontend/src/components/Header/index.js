import { Link, useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";

import styles from "./header.module.css";


function Header() {

const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

const navigate = useNavigate();


useEffect(() => {

const handleStorageChange = () => {

setIsLoggedIn(!!localStorage.getItem("token"));


};



window.addEventListener("storage", handleStorageChange);

return () => {

window.removeEventListener("storage", handleStorageChange);

};

}, []);


const handleLogout = () => {

localStorage.removeItem("token");

setIsLoggedIn(false);

navigate("/login");

};


return (

<header className={styles.header}>

<Link className={styles.logo} to="/">Prime Flix</Link>


<div className={styles.navButtons}>

<Link className={styles.favorites} to="/favorites">Meus Filmes</Link>

{isLoggedIn ? (

<button className={styles.logoutButton} onClick={handleLogout}>Sair</button>

) : (

<Link to="/login">

<button className={styles.loginButton}>Login</button>

</Link>

)}

</div>

</header>

);

}


export default Header; 