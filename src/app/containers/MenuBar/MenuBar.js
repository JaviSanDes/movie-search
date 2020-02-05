import React, { Component } from 'react';
import classses from './MenuBar.css';

import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../store/actions/index';

class MenuBar extends Component {

    state = {
        redirectHome: false,
        search: false,
        toggleCLass: false
    }

    moveLeftFunction = (e) => {
        e.preventDefault();
        this.props.lefValue === 250 ? this.props.moveLeft(0) : this.props.moveLeft(250);
        this.props.lefValue === 250 ? this.setState({ toggleCLass: false }) : this.setState({ toggleCLass: true });
    }

    redirectHome = () => {
        this.setState({ redirectHome: true });
    }
    inputChange = (e) => {
        let value = e.target.value;
        var regex = / /gi;
        let newVal = value.replace(regex, '%20');
        this.props.inputValue(newVal);
        this.setState({ search: true });
    }
    StartInput = (e) => {
        e.target.value = '';
        this.props.inputValue('');
    }

    render() {

        let toggleCLass = [classses.container];
        this.state.toggleCLass === true ? toggleCLass.push([classses.change]) : toggleCLass = [classses.container];

        let toggleMenu = (
            <div className={toggleCLass.join(' ')} onClick={(e) => this.moveLeftFunction(e)}>
                <div className={classses.bar1}></div>
                <div className={classses.bar2}></div>
                <div className={classses.bar3}></div>
            </div>
        );
        let homeButton = (
            <div className={classses.homeButton} onClick={() => this.redirectHome()}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M258.5 104.1c-1.5-1.2-3.5-1.2-5 0l-156 124.8c-.9.8-1.5 1.9-1.5 3.1v230c0 1.1.9 2 2 2h108c1.1 0 2-.9 2-2V322c0-1.1.9-2 2-2h92c1.1 0 2 .9 2 2v140c0 1.1.9 2 2 2h108c1.1 0 2-.9 2-2V232c0-1.2-.6-2.4-1.5-3.1l-156-124.8z" />
                    <path d="M458.7 204.2l-189-151.4C265.9 49.7 261 48 256 48s-9.9 1.7-13.7 4.8L160 119.7V77.5c0-1.1-.9-2-2-2H98c-1.1 0-2 .9-2 2v92.2l-42.7 35.1c-3.1 2.5-5.1 6.2-5.3 10.2-.2 4 1.3 7.9 4.1 10.7 2.6 2.6 6.1 4.1 9.9 4.1 3.2 0 6.3-1.1 8.8-3.1l183.9-148c.5-.4.9-.4 1.3-.4s.8.1 1.3.4l183.9 147.4c2.5 2 5.6 3.1 8.8 3.1 3.7 0 7.2-1.4 9.9-4.1 2.9-2.8 4.4-6.7 4.2-10.7-.3-4-2.2-7.7-5.4-10.2z" />
                </svg>
            </div>
        );
        if (this.state.redirectHome) {
            this.setState({ redirectHome: false });
            homeButton = <Redirect to="/" />;
        };
        let searchInput = (
            <div>
                <svg className={classses.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M337.509 305.372h-17.501l-6.571-5.486c20.791-25.232 33.922-57.054 33.922-93.257C347.358 127.632 283.896 64 205.135 64 127.452 64 64 127.632 64 206.629s63.452 142.628 142.225 142.628c35.011 0 67.831-13.167 92.991-34.008l6.561 5.487v17.551L415.18 448 448 415.086 337.509 305.372zm-131.284 0c-54.702 0-98.463-43.887-98.463-98.743 0-54.858 43.761-98.742 98.463-98.742 54.7 0 98.462 43.884 98.462 98.742 0 54.856-43.762 98.743-98.462 98.743z" />
                </svg>
                <input
                    type='text'
                    className={classses.input}
                    onChange={(e) => this.inputChange(e)}
                    onClick={(e) => this.StartInput(e)}
                    placeholder="Search">
                </input>
            </div>
        )
        let InputRedirect = null;
        if (this.state.search) {
            this.setState({ search: false });
            InputRedirect = <Redirect to="/Search" />;
        }

        return (
            <div className={classses.principalDiv}>
                {toggleMenu}
                {homeButton}
                <div className={classses.RightPosition}>
                    {searchInput}
                </div>
                {InputRedirect}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        lefValue: state.elementInfo.left
    }
}
const mapDispatchToProps = dispatch => {
    return {
        moveLeft: (value) => dispatch(actions.moveLeft(value)),
        inputValue: (value) => dispatch(actions.inputValue(value))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);