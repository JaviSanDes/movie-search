import React, {Component} from 'react';
import classes from './home.css';

import ListCreator from '../../containers/listCreator/ListCreator';
import LatestMedia from '../../containers/latestMedia/LatestMedia';

class Home extends Component {
    
    componentDidMount(){
        window.scrollTo(0, 0);
    }
    render(){
        let popular= (
            <ListCreator
                key={1}
                id={1}
                title={'popular list'}
                url={`https://api.themoviedb.org/3/movie/popular?api_key={YOUR API KEY}&language=en-US&page=`}
            />
        )

        let newPalying= (
            <ListCreator
                key={2}
                id={2}
                title={'new list'}
                url={`https://api.themoviedb.org/3/movie/now_playing?api_key={YOUR API KEY}&language=en-US&page=`}
            />
        )

        let topRated= (
            <ListCreator
                key={3}
                id={3}
                title={'top rated list'}
                url={`https://api.themoviedb.org/3/movie/top_rated?api_key={YOUR API KEY}&language=en-US&page=`}
            />
        )

        let upComing= (
            <ListCreator
                key={4}
                id={4}
                title={'up coming list'}
                url={`https://api.themoviedb.org/3/movie/upcoming?api_key={YOUR API KEY}&language=en-US&page=`}
            />
        )
        return (
            <div className={classes.divprincipal}>
                <div className={classes.degradado}></div>
                <LatestMedia /> 
                <div className={classes.list}>
                    {newPalying}
                    {topRated}
                    {popular}
                    {upComing}
                </div>
                <div className={classes.bottomDiv}></div>
            </div>
            
        )
    }
}

export default Home;
