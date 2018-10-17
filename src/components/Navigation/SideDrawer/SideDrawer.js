import React from 'react';
import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop'

const sideDrawer = (props) => {
    let attachClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachClasses.join(' ')} onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo height='50%' />
                </div>
                <nav>
                    <NavigationItems
                        isAuth={props.isAuth} />
                </nav>
            </div>
        </Aux>
    )
};


export default sideDrawer;