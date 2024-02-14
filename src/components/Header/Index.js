import React from 'react'

import logo from "../../Images/Logo.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import classes from './Header.module.css'

const Header = () => {
  return (
    <div className={classes.container}>
        <img src={logo} alt="georgian equestrian federation logo" className={classes.logo}/>
        <div className={classes.category}>
            <p>Showjumping</p>
            <p>Horse Race</p>
            <p>Tours</p>
            <p>Stables</p>
            <p>About</p>
        </div>
        <FontAwesomeIcon icon={faUser} size='2xl' className={classes.profileIcon}/>
    </div>
  )
}

export default Header;