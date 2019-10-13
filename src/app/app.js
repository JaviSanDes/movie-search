import React, { Component } from 'react';
import classes from './app.css';

import Home from './components/Home//home';
import ElementInfo from './components/ElementInfo/ElementInfo';
import MenuLateral from './containers/lateralMenu/LateralMenu';
import Search from './components/Search/Search';
import MenuBar from './containers/MenuBar/MenuBar';

import { connect } from 'react-redux';
import { Route, withRouter, Switch } from 'react-router-dom'

class App extends Component {

    render(){
        let divPrincipal = {
            left: `${this.props.leftValue}px`
        }
        let routes = (
            <Switch>
                
                <Route path="/elementInfo/:id" render={(props) => (
                    <ElementInfo value={25} key={props.match.params.id} {...props} />)
                } />
                <Route path="/:id" render={(props) => (
                    <Search value={25} key={props.match.params.id} {...props} />)
                } />
                <Route path="/" exact component={Home} />
            </Switch>
        )
        return(
                <div>
                    <MenuBar />
                    <MenuLateral />
                    <div className={classes.divPrincipal} style={divPrincipal}>
                        {routes}
                    </div>
                </div>
                    
               
        )
    }
}
const mapStateToProps = state => {
    return {
        leftValue: state.elementInfo.left
    }
}

export default withRouter(connect(mapStateToProps)(App));