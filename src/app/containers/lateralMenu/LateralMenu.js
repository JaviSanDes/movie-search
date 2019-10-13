import React, { Component } from 'react';

import { connect } from 'react-redux';

import NavigationItem from '../navigationItem/NavigationItem';
import classes from './LateralMenu.css';

class LateralMenu extends Component {

    
    
    render (){

        let divPrincipal = {
            width: `${this.props.leftValue}px`
        }

        let gender = (
            <ul className={classes.lista}>
                <NavigationItem value="12"    link="/12/Adventure"        exact><li>Adventure</li></NavigationItem>
                <NavigationItem value="16"    link="/16/Animation"        exact><li>Animation</li></NavigationItem>
                <NavigationItem value="28"    link="/28/Accion"           exact><li>Accion</li></NavigationItem>
                <NavigationItem value="35"    link="/35/Comedy"           exact><li>Comedy</li></NavigationItem>
                <NavigationItem value="80"    link="/80/Crime"            exact><li>Crime</li></NavigationItem>
                <NavigationItem value="99"    link="/99/Documentary"      exact><li>Documentary</li></NavigationItem>
                <NavigationItem value="18"    link="/18/Drama"            exact><li>Drama</li></NavigationItem>
                <NavigationItem value="10751" link="/10751/Family"        exact><li>Family</li></NavigationItem>
                <NavigationItem value="14"    link="/14/Fantasy"          exact><li>Fantasy</li></NavigationItem>
                <NavigationItem value="36"    link="/36/History"          exact><li>History</li></NavigationItem>
                <NavigationItem value="27"    link="/27/Horror"           exact><li>Horror</li></NavigationItem>
                <NavigationItem value="10402" link="/10402/Music"         exact><li>Music</li></NavigationItem>
                <NavigationItem value="9648"  link="/9648/Mystery"        exact><li>Mystery</li></NavigationItem>
                <NavigationItem value="10749" link="/10749/Romance"       exact><li>Romance</li></NavigationItem>
                <NavigationItem value="878"   link="/878/Fiction Science" exact><li>Fiction Science</li></NavigationItem>
                <NavigationItem value="10770" link="/10770/TV Movie"      exact><li>TV Movie</li></NavigationItem>
                <NavigationItem value="53"    link="/53/Thriler"          exact><li>Thriler</li></NavigationItem>
                <NavigationItem value="10752" link="/10752/War"           exact><li>War</li></NavigationItem>
                <NavigationItem value="37"    link="/37/Western"          exact><li>Western</li></NavigationItem>
            </ul>
        )
        
        return (
            <div className={classes.menuBox} style={divPrincipal}>
               {gender}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        leftValue: state.elementInfo.left
    }
}
export default connect(mapStateToProps)(LateralMenu);
