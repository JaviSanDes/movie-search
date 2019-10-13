import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.css';

const navigationItem = ( props ) => (
    
        <div className={classes.pestaña}  onClick={props.logout}>
            <NavLink
                to={props.link}
                value={props.value}
                exact={props.exact}
                className={classes.pestañaLink}
                activeClassName=''>{props.children}</NavLink>
        </div>
    
);

export default navigationItem;